public class Option implements comparable {
    @AuraEnabled
    public String label;
    @AuraEnabled
    public String value;
    @AuraEnabled
    public Object additionalParameter;

    public Option(String label, String value) {
        this.label = label;
        this.value = value;
    }

    public Option(String label, String value, Object additionalParameter) {
        this.label = label;
        this.value = value;
        this.additionalParameter = additionalParameter;
    }


    public Integer compareTo(Object compareTo) {
        Integer result;

        Option compareToOption = (Option)compareTo;

        if (label == compareToOption.label) {
            result = 0;
        }
        else if (label > compareToOption.label) {
            result = 1;
        } else {
            result = -1;
        }

        return result;
    }
}