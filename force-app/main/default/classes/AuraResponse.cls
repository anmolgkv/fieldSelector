public with sharing class AuraResponse {
    @AuraEnabled
    public Boolean isSuccess;

    @AuraEnabled
    public String message;

    @AuraEnabled
    public Object response;

    public AuraResponse(Boolean isSuccess, String message, Object response) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.response = response;
    }
}