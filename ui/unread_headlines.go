// Copyright 2018 Frédéric Guillot. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package ui

import (
	"net/http"

	"github.com/miniflux/miniflux/http/context"
	"github.com/miniflux/miniflux/http/request"
	"github.com/miniflux/miniflux/http/response/html"
	"github.com/miniflux/miniflux/http/route"
	"github.com/miniflux/miniflux/model"
	"github.com/miniflux/miniflux/ui/session"
	"github.com/miniflux/miniflux/ui/view"
)

// ShowUnreadPage render the page with all unread entries.
func (c *Controller) ShowUnreadHeadlinesPage(w http.ResponseWriter, r *http.Request) {
	ctx := context.New(r)
	sess := session.New(c.store, ctx)
	view := view.New(c.tpl, ctx, sess)

	user, err := c.store.UserByID(ctx.UserID())
	if err != nil {
		html.ServerError(w, err)
		return
	}

	offset := request.QueryIntParam(r, "offset", 0)
	builder := c.store.NewEntryQueryBuilder(user.ID)
	builder.WithStatus(model.EntryStatusUnread)
	countUnread, err := builder.CountEntries()
	if err != nil {
		html.ServerError(w, err)
		return
	}

	if offset >= countUnread {
		offset = 0
	}

	builder = c.store.NewEntryQueryBuilder(user.ID)
	builder.WithStatus(model.EntryStatusUnread)
	builder.WithOrder(model.DefaultSortingOrder)
	builder.WithDirection(user.EntryDirection)
	builder.WithOffset(offset)
	builder.WithLimit(nbItemsPerPage)
	entries, err := builder.GetEntries()
	if err != nil {
		html.ServerError(w, err)
		return
	}

	view.Set("entries", entries)
	view.Set("pagination", c.getPagination(route.Path(c.router, "unread"), countUnread, offset))
	view.Set("menu", "unread")
	view.Set("user", user)
	view.Set("countUnread", countUnread)
	view.Set("hasSaveEntry", c.store.HasSaveEntry(user.ID))

	html.OK(w, r, view.Render("unread_headlines"))
}
