public with sharing class FaqController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> searchFaqs(String searchTerm, Integer pageNumber) {
        Integer recordsPerPage = 10;
        Integer offSet = (pageNumber - 1) * recordsPerPage;
        String searchQuery = '%' + searchTerm + '%';

        List<FAQ__c> faqs = [
            SELECT Id, Question__c, Answer__c 
            FROM FAQ__c 
            WHERE Question__c LIKE :searchQuery
            ORDER BY Question__c
            LIMIT   :recordsPerPage
            OFFSET  :offSet
        ];

        Integer totalCount = [
            SELECT COUNT()
            FROM FAQ__c 
            WHERE Question__c LIKE :searchQuery
        ];

        Map<String, Object> result = new Map<String, Object>();
        result.put('faqs', faqs);
        result.put('totalCount', totalCount);
        return result;
    }
}
