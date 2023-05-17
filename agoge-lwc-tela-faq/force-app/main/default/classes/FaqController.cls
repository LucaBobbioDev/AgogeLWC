public with sharing class FaqController {
    @AuraEnabled(cacheable=true)
    public static List<FAQ__c> searchFaqs(String searchTerm) {
        String searchQuery = '%'+searchTerm+'%';
        return [
            SELECT Id, Question__c, Answer__c 
            FROM FAQ__c 
            WHERE Question__c LIKE :searchQuery
        ];
    }
}