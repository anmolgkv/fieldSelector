({
    setOptions: function (component, currentIndex, isInitialized) {
        let getListOfOptions;
        let selectionOption = component.get("v.selectionOption") || {};
        let objectName = selectionOption["options"][currentIndex]["sObjectName"];

        selectionOption["options"][currentIndex]["status"] = "loading";

        component.set("v.selectionOption", selectionOption);

        if (isInitialized) {
            getListOfOptions = component.get("c.getListOfOptionsForPrefix");

            getListOfOptions.setParams({ objectName });
        } else {
            getListOfOptions = component.get("c.getListOfOptions");

            getListOfOptions.setParams({ objectName });
        }

        getListOfOptions.setCallback(this, (response) => {
            this.hideSpinner(component);

            let responseData = response.getReturnValue();
            if (response.getState() === 'SUCCESS' && responseData.isSuccess) {
                let listOfOptions = responseData.response;
                currentIndex = currentIndex || 0;
                let skipReference = selectionOption["options"].length > 5;

                selectionOption["options"][currentIndex]["options"] = this.addAllToList(selectionOption["options"][currentIndex]["options"], listOfOptions, skipReference);
                selectionOption["options"][currentIndex]["status"] = "Active";
                component.set("v.selectionOption", selectionOption);
            } else {
                this.handleFailedCallback(component, responseData);
            }
        });

        $A.enqueueAction(getListOfOptions);
    },
    addAllToList: function (list1, list2, skipReference) {
        list1 = list1 || [];
        list2 = list2 || [];

        let finalList = [];
        for (let i = 0; i < list1.length; i += 1) {
            let type = list1[i]["additionalParameter"]["sObjectType"];

            if (skipReference && type === "REFERENCE") {
                continue;
            } else if (type === "REFERENCE") {
                list1[i]["iconName"] = "utility:chevronright";
            }
            finalList.push(list1[i]);
        }
        for (let i = 0; i < list2.length; i += 1) {
            let type = list2[i]["additionalParameter"]["sObjectType"];

            if (skipReference && type === "REFERENCE") {
                continue;
            } else if (type === "REFERENCE") {
                list2[i]["iconName"] = "utility:chevronright";
            }
            finalList.push(list2[i]);
        }
        return finalList;
    },
    setDefaultSelectOption: function (component) {
        let selectionOption = {
            "currentIndex": 0,
            "options": [{
                "status": "inactive"
            }]
        };

        component.set("v.selectionOption", selectionOption);
    },
    setFieldReference: function (component) {
        let selectionOption = component.get("v.selectionOption");
        let selectedFieldCompleteName = '';

        for (let i = 0; i < selectionOption["options"].length; i += 1) {
            if (selectionOption["options"][i]["type"] === "REFERENCE") {
                selectedFieldCompleteName += "." + selectionOption["options"][i]["targetReferenceField"];
            } else {
                selectedFieldCompleteName += "." + selectionOption["options"][i]["value"];
            }
        }
        selectedFieldCompleteName = selectedFieldCompleteName.substring(1);
        let lastIndex = selectionOption["options"].length - 1;

        let type = selectionOption["options"][lastIndex]["type"];
        let selectedFieldName = selectionOption["options"][lastIndex]["value"];
        let selectedObjectName = selectionOption["options"][lastIndex]["sObjectName"];

        this.fireFieldSelection(component, {
            "selectedFieldCompleteName": selectedFieldCompleteName,
            "selectedObjectName": selectedObjectName,
            "selectedFieldName": selectedFieldName,
            "type": type
        });
    },
    fireFieldSelection: function (component, params) {
        let onFieldSelection = component.getEvent("onFieldSelection");
        onFieldSelection.fire(params);
    }
})