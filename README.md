willsALMANJ fork
================
This fork carries the following changes to upstream Miniflux:

* The "Unread" view shows full content for feed items.
* A new "Headlines" view shows the "Unread" view in upstream Miniflux (with just the titles)
* A new keyboard shortcut (`g q`) opens the headlines view
  - "q" is for "quick" since "h" for "headlines" was already taken for "history", as was "s" for "short".

Notes
-----
* The default "Unread" was modified rather than creating a new full content view just for convenience in merging upstream changes (they will get merged in by git rather than having to copy them by hand to the extra view).
* These patches were not integrated in an elegant way in the code because it seems unlikely such a feature will be accepted upstream. These patches are small, so they should be easier to maintain with future updates to Miniflux than a more proper implementation (which would really leave only the "Unread" view with a preference whether to show full content or just the titles).

Miniflux 2
==========
[![Build Status](https://travis-ci.org/miniflux/miniflux.svg?branch=master)](https://travis-ci.org/miniflux/miniflux)
[![GoDoc](https://godoc.org/github.com/miniflux/miniflux?status.svg)](https://godoc.org/github.com/miniflux/miniflux)
[![Documentation Status](https://readthedocs.org/projects/miniflux/badge/?version=latest)](https://docs.miniflux.app/)

Miniflux is a minimalist and opinionated feed reader:

- Written in Go (Golang)
- Works only with Postgresql
- Doesn't use any ORM
- Doesn't use any complicated framework
- Use only modern vanilla Javascript (ES6 and Fetch API)
- Single binary compiled statically without dependency
- The number of features is voluntarily limited

It's simple, fast, lightweight and super easy to install.

Official website: <https://miniflux.app>

Miniflux 2 is a rewrite of [Miniflux 1.x](https://github.com/miniflux/miniflux-legacy) in Golang.

Documentation
-------------

The Miniflux documentation is available here: <https://docs.miniflux.app/>

- [Opinionated?](https://docs.miniflux.app/en/latest/opinionated.html)
- [Features](https://docs.miniflux.app/en/latest/features.html)
- [Requirements](https://docs.miniflux.app/en/latest/requirements.html)
- [Installation Instructions](https://docs.miniflux.app/en/latest/installation.html)
- [Installation Tutorials](https://docs.miniflux.app/en/latest/tutorials.html)
- [Upgrading to a new version](https://docs.miniflux.app/en/latest/upgrade.html)
- [Configuration](https://docs.miniflux.app/en/latest/configuration.html)

Credits
-------

- Author: Frédéric Guillot
- Distributed under Apache 2.0 License
