
angular.module("hackerNewsApp", [])
    .controller('newsController', function(NewsService){

    var vm = this;
    var articlesToShow = [];
    var currentStory = '';
    vm.stories = [];

    vm.viewMoreItems = function(){
        NewsService.getStories(currentStory).then(function(response){
           publishTenMoreStories(response.data, true);
        });
    }

    vm.getStories = function(typeOfStories){
        currentStory = typeOfStories;
        NewsService.getStories(typeOfStories).then(function(response){
            publishTenMoreStories(response.data);
        });
    }

    vm.getStories();

    function publishTenMoreStories(stories, addMore){
        articlesToShow = [];
        if(addMore) {
          var number = 0;
          var index = 0;
          while (number < 10) {
            if(isNew(stories[index])){
              articlesToShow.push(stories[index])
              number++;
            }
            index++;
          }
        }
        else {
          articlesToShow = stories.slice(0,10);
          vm.stories = [];
        }

        angular.forEach(articlesToShow, function(id){
            NewsService.getStory(id).then(function(response){
              if(!response.data.url || response.data.url === ''){
                response.data.url = 'https://news.ycombinator.com/item?id=' + response.data.id;
              }
                vm.stories.push(response.data);
            });
        });
    }

    function isNew(id){
      var answer = true;
      angular.forEach(vm.stories, function(story){
        if(story.id === id) answer = false;
      });
      return answer;
    }

})

.filter('datediff', function(){
  return function(date) {

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      return interval + " minutes ago";
}
});
