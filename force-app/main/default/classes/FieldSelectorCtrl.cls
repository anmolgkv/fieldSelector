public with sharing class FieldSelectorCtrl {

    @AuraEnabled
    public static AuraResponse getListOfOptionsForPrefix(String objectPrefixId) {
        String objectName = SchemaGlobalDescribe.findObjectNameFromRecordIdPrefix(objectPrefixId);
        return getListOfOptions(objectName);
    }

    @AuraEnabled
    public static AuraResponse getListOfOptions(String objectName) {

        AuraResponse response;
        try {
            List<Option> fieldOptions = new List<Option>();
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Map<String, Schema.SObjectField> fieldMap = schemaMap.get(objectName).getDescribe().fields.getMap();

            for(Schema.SObjectField sfield : fieldMap.Values()) {
                schema.describefieldresult dfield = sfield.getDescribe();

                String label = dfield.getLabel();
                String name = dfield.getname();
                String strType = String.valueOf(dfield.getType());

                TypeWrapper type;

                if(strType == 'REFERENCE') {
                    List<Schema.SObjectType> listOfReference = dfield.getReferenceTo();
                    String refrenceType = listOfReference.get(0).getDescribe().getName();
                    String targetReferenceField = dfield.getRelationshipName();
                    type = new TypeWrapper(strType, refrenceType, targetReferenceField);
                } else {
                    type = new TypeWrapper(strType);
                }

                Option option = new Option(label, name, type);
                fieldOptions.add(option);
            }
            fieldOptions.sort();
            response = new AuraResponse(true, 'SUCCESS', fieldOptions);
        } catch(Exception ex) {
            response = new AuraResponse(false, ex.getMessage() + ex.getStackTraceString(), null);
        }
        return response;
    }

    public class TypeWrapper {
        @AuraEnabled
        public String sObjectType;
        @AuraEnabled
        public String sObjectTypeRefrenceName;
        @AuraEnabled
        public String targetReferenceField;

        public TypeWrapper(String sObjectType) {
            this.sObjectType = sObjectType;
        }

        public TypeWrapper(String sObjectType, String sObjectTypeRefrenceName, String targetReferenceField) {
            this.sObjectType = sObjectType;
            this.sObjectTypeRefrenceName = sObjectTypeRefrenceName;
            this.targetReferenceField = targetReferenceField;
        }
    }
}