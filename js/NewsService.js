
angular.module("hackerNewsApp").factory("NewsService", function($http){
    
    var defaultStoryType = 'topstories';
    
    return {
        getStories: function(typeOfStory){
            return $http.get('https://hacker-news.firebaseio.com/v0/' + (typeOfStory || defaultStoryType) + '.json');
        },
        getStory: function(id){
            return $http.get('https://hacker-news.firebaseio.com/v0/item/' + id  + '.json?print=pretty');
        }
    }
});
