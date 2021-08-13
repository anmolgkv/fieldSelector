public class SchemaGlobalDescribe {

    public static String findObjectNameFromRecordIdPrefix(String recordIdOrPrefix) {
        String objectName = '';

        String myIdPrefix = String.valueOf(recordIdOrPrefix).substring(0,3);
        Map<String, Schema.SObjectType> gd =  Schema.getGlobalDescribe();

        for(Schema.SObjectType stype : gd.values()) {
            Schema.DescribeSObjectResult r = stype.getDescribe();
            String prefix = r.getKeyPrefix();

            if(prefix != null && prefix.equals(myIdPrefix)) {
                objectName = r.getName();
                break;
            }
        }

        return objectName;
    }
}