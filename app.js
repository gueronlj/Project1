//default query
const allCountries = [
   'us','ar','au','at','be','br','bg','ca','cn','co','cz','eg','fr','de','gr','hk','hu','in','id','ie','il','it','jp','lv','lt','my','mx','ma','nl','nz','ng','no','ph','pl','pt','ro','sa','rs','sg','sk','si','za','kr','se','ch','tw','th','tr','ae','ua','gb','ve'
]

const allLanguages = [
   'ar','de','en','es','fr','he','it','nl','no','pt','ru','se','zh'
]

const allCategories = [
   'general',
   'business',
   'entertainment',
   'health',
   'science',
   'sports',
   'technology'
]

let keyword = 'covid'
let countryIndex = allCountries[22]
let languageIndex = allLanguages[2]
let categoryIndex = allCategories[5]

const key = 'ad5efa85ecde97e26bac1ae906948e4a'
let startDate = '2021-08-24'
let keywords = `&keywords=${keyword}`
let categories = `&cetegories=${categoryIndex}`

$(() => {

   $('.language').on('click' , (e) => {
      target = $(event.target).parent()
      languageIndex = target[0].id
      console.log(languageIndex);

   })

   $('.flag').on('click' , (event) => {
      countryIndex = ((event.target).id);
      console.log(countryIndex);
      let languages =`&languages=${languageIndex}`
      let countries = `&countries=${countryIndex}`
      let ajaxUrl = `http://api.mediastack.com/v1/news?access_key=${key}&date=${startDate},2021-12-31&limit=60`

      if (keywords) {////////changes query based on filters.
         ajaxUrl = ajaxUrl + keywords
      }
      if (countries){
         ajaxUrl = ajaxUrl + countries
      }
      if (languages){
         ajaxUrl = ajaxUrl + languages
      }
      if (categories){
         ajaxUrl = ajaxUrl + categories
      }

      ajaxCall(ajaxUrl)

   })
})
//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE--------!!!!!!!!!!!!!!!!!!!!!!---------------------------

const printData = (array) => {
   for (let i = 0; i < array.length; i++){
      let url = array[i].url
      let title = array[i].title
      let description = array[i].description
      let img = array[i].image
      let date = array[i].published_at

      const $article = $('<div>').addClass('article').appendTo($('#content'))
      const $info = $('<div>').addClass('info').appendTo($article)
      const $images = $('<div>').addClass('articleImage').appendTo($article)
      const $title = $('<h3>').addClass('title').text(title).appendTo($info)
      const $description = $('<p>').addClass('info').text(description).appendTo($info)
      const $url = $('<a>').addClass('info').text(url).appendTo($info)
      const $date = $('<p>').addClass('info').text(date).appendTo($info)
      const $img = $('<img>').attr('src',img).appendTo($images)
   }
}

const ajaxCall = (url) => {
   $.ajax(
      {
            url: url
      }
   ).then(
      (data) => {
         let array = Object.values(data.data)
         printData(array)
//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE--------!!!!!!!!!!!!!!!!!!!!!!---------------------------
      },
      () => {
         console.log("failed to get data");
      }
   )
}
