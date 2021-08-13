({
    DEFAULT_ERROR_MESSAGE: "Something went wrong!",
    handleFailedCallback: function (component, responseData) {
        var errorMessage = responseData.message || this.DEFAULT_ERROR_MESSAGE;
        this.showToast(component, 'Error', 'error', errorMessage);
    },
    showToast: function (component, title, type, message) {
        component.set("v.toastDetail", { title, message, type, "isVisible": true });
    },
    hideToast: function (component) {
        component.set("v.toastDetail", {});
    },
    hideSpinner: function (component) {
        component.set("v.isLoading", false);
    },
    showSpinner: function (component) {
        component.set("v.isLoading", true);
    }
})