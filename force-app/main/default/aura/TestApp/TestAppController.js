({
    init: function (cmp) {
        const objectName = cmp.get("v.objectName");

        cmp.set("v.isActive", true);
        cmp.find("fieldSelector").initiateFileSelection(objectName);
    },
    setSelectedField: function (cmp, evt) {
        cmp.set("v.fieldCompleteName", evt.getParam("selectedFieldCompleteName"));
        cmp.set("v.fieldName", evt.getParam("selectedFieldName"));

        cmp.set("v.isActive", false);
    }
});