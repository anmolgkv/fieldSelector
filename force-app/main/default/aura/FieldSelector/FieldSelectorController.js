({
    doInit: function (component, event, helper) {
        helper.setDefaultSelectOption(component);
    },
    initiateFieldSelection: function (component, event, helper) {
        let params = event.getParam('arguments');
        let selectionOption = component.get("v.selectionOption") || {};

        selectionOption["options"][0]["sObjectName"] = params["objectName"];
        selectionOption["options"][0]["options"] = params["additionalOptions"];
        let searchByPrefix = params["searchByPrefix"];
        component.set("v.selectionOption", selectionOption);

        component.set("v.isActive", true);
        helper.setOptions(component, 0, searchByPrefix);
    },
    optionSelectionHandler: function (component, event, helper) {
        let selectedOption = event.getParam("selectedOption");
        let index = Number(event.getParam("index"));
        let selectionOption = component.get("v.selectionOption") || {};
        selectionOption["options"][index]["type"] = selectedOption["additionalParameter"]["sObjectType"];

        if (selectedOption["additionalParameter"]["sObjectType"] === "REFERENCE") {
            selectionOption["options"][index]["targetReferenceField"] = selectedOption["additionalParameter"]["targetReferenceField"];

            selectionOption["options"].push({
                "sObjectName": selectedOption["additionalParameter"]["sObjectTypeRefrenceName"],
                "options": []
            });

            if (selectionOption["options"].length > index + 2) {
                selectionOption["options"].length = index + 2;
            }

            component.set("v.selectionOption", selectionOption);
            helper.setOptions(component, index + 1);
        } else {

            if (selectionOption["options"].length > index + 1) {
                selectionOption["options"].length = index + 1;
            }
            selectionOption["options"][index]["targetReferenceField"] = null;
            component.set("v.selectionOption", selectionOption);
        }
    },
    done: function (component, event, helper) {
        helper.setFieldReference(component);
        helper.setDefaultSelectOption(component);
        component.set("v.isActive", false);
    },
    cancel: function (component, event, helper) {
        helper.setDefaultSelectOption(component);
        component.set("v.isActive", false);
        helper.fireFieldSelection(component, {
            "isCanceled": true
        });
    }
})