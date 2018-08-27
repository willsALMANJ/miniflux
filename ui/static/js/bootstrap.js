document.addEventListener("DOMContentLoaded", function() {
    FormHandler.handleSubmitButtons();

    let touchHandler = new TouchHandler();
    touchHandler.listen();

    let navHandler = new NavHandler();
    let keyboardHandler = new KeyboardHandler();
    keyboardHandler.on("g u", () => navHandler.goToPage("unread"));
    keyboardHandler.on("g q", () => navHandler.goToPage("unread_headlines"));
    keyboardHandler.on("g b", () => navHandler.goToPage("starred"));
    keyboardHandler.on("g h", () => navHandler.goToPage("history"));
    keyboardHandler.on("g f", () => navHandler.goToPage("feeds"));
    keyboardHandler.on("g c", () => navHandler.goToPage("categories"));
    keyboardHandler.on("g s", () => navHandler.goToPage("settings"));
    keyboardHandler.on("ArrowLeft", () => navHandler.goToPrevious());
    keyboardHandler.on("ArrowRight", () => navHandler.goToNext());
    keyboardHandler.on("j", () => navHandler.goToPrevious());
    keyboardHandler.on("p", () => navHandler.goToPrevious());
    keyboardHandler.on("k", () => navHandler.goToNext());
    keyboardHandler.on("n", () => navHandler.goToNext());
    keyboardHandler.on("h", () => navHandler.goToPage("previous"));
    keyboardHandler.on("l", () => navHandler.goToPage("next"));
    keyboardHandler.on("o", () => navHandler.openSelectedItem());
    keyboardHandler.on("v", () => navHandler.openOriginalLink());
    keyboardHandler.on("m", () => navHandler.toggleEntryStatus());
    keyboardHandler.on("A", () => navHandler.markPageAsRead());
    keyboardHandler.on("s", () => navHandler.saveEntry());
    keyboardHandler.on("d", () => navHandler.fetchOriginalContent());
    keyboardHandler.on("f", () => navHandler.toggleBookmark());
    keyboardHandler.on("?", () => navHandler.showKeyboardShortcuts());
    keyboardHandler.on("/", (e) => navHandler.setFocusToSearchInput(e));
    keyboardHandler.on("Escape", () => ModalHandler.close());
    keyboardHandler.listen();

    let mouseHandler = new MouseHandler();
    mouseHandler.onClick("a[data-save-entry]", (event) => {
        event.preventDefault();
        EntryHandler.saveEntry(event.target);
    });

    mouseHandler.onClick("a[data-toggle-bookmark]", (event) => {
        event.preventDefault();
        EntryHandler.toggleBookmark(event.target);
    });

    mouseHandler.onClick("a[data-toggle-status]", (event) => {
        event.preventDefault();

        let currentItem = DomHelper.findParent(event.target, "item");
        if (currentItem) {
            EntryHandler.toggleEntryStatus(currentItem);
        }
    });

    mouseHandler.onClick("a[data-fetch-content-entry]", (event) => {
        event.preventDefault();
        EntryHandler.fetchOriginalContent(event.target);
    });

    mouseHandler.onClick("a[data-on-click=markPageAsRead]", () => navHandler.markPageAsRead());
    mouseHandler.onClick("a[data-confirm]", (event) => {
        (new ConfirmHandler()).handle(event);
    });

    mouseHandler.onClick("a[data-action=search]", (event) => {
        navHandler.setFocusToSearchInput(event);
    });

    if (document.documentElement.clientWidth < 600) {
        let menuHandler = new MenuHandler();
        mouseHandler.onClick(".logo", () => menuHandler.toggleMainMenu());
        mouseHandler.onClick(".header nav li", (event) => menuHandler.clickMenuListItem(event));
    }

    if ("serviceWorker" in navigator) {
        let scriptElement = document.getElementById("service-worker-script");
        if (scriptElement) {
            navigator.serviceWorker.register(scriptElement.src);
        }
    }
});
