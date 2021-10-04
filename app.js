//
// const allCountries = [
//    'us','ar','au','at','be','br','bg','ca','cn','co','cz','eg','fr','de','gr','hk','hu','in','id','ie','il','it','jp','lv','lt','my','mx','ma','nl','nz','ng','no','ph','pl','pt','ro','sa','rs','sg','sk','si','za','kr','se','ch','tw','th','tr','ae','ua','gb','ve'
// ]
//
// const allLanguages = [
//    'ar','de','en','es','fr','he','it','nl','no','pt','ru','se','zh'
// ]
//
// const allCategories = [
//    'general',
//    'business',
//    'entertainment',
//    'health',
//    'science',
//    'sports',
//    'technology'
// ]
//-------------------------------default search terms--------------------------------
let keyword = ''
let countryIndex = ''
let languageIndex = ''
let categoryIndex = ''

const key = '516fdd9b73f00bef1d2919450366c2d8'
let startDate = '2021-09-24'
let keywords = `&keywords=${keyword}`
let categories = `&cetegories=${categoryIndex}`
let languages =`&languages=${languageIndex}`
let countries = `&countries=${countryIndex}`
let ajaxUrl = `http://api.mediastack.com/v1/news?access_key=${key}&date=${startDate},2021-12-31&limit=10`

let languageFilter = null
let countryFilter = false
let categoryFilter = null
let keywordFilter = false
//----------------WARNINGGGG--!!!!!!!!!!-----DO NOT CROSS THIS LINE---!!!!!!!!!!!!!!!!!!-------
$(() => {
//--------------------------------carousel----------------------------------------
   $flags =  $('.flag').siblings()
   $maxFlags = $('.flag').siblings().length
   console.log($maxFlags);
   let currentImgIndex = 5
   for (let i = 0; i < $maxFlags; i++){
      $($flags[i]).hide()
      $($flags[i]).appendTo($('#scope'))
   }
   for (let i = 0; i < 6; i++){
      $($flags[i]).show()
   }
   $('#next').on('click', () => {
      if (currentImgIndex < $maxFlags-1){
         currentImgIndex++
      } else {
         currentImgIndex = $maxFlags
      }
      $('#scope').children().eq(currentImgIndex-6).hide()
      $('#scope').children().eq(currentImgIndex).show()
      console.log(currentImgIndex);
   })

   $('#previous').on('click', () => {
      if (currentImgIndex > 5){
         $('#scope').children().eq(currentImgIndex).hide()
         $('#scope').children().eq(currentImgIndex-6).show()
         currentImgIndex--
         console.log(currentImgIndex);
      } else {
         currentImgIndex = 5
      }
   })
//------------------------------language filter---------------------------
   $('.btn').on('click' , (e) => {
      $target = $(e.currentTarget)
      if ($target.hasClass('locked')=== true){
      } else {
         $target.toggleClass('on')
         languageFilter = $target
         languageIndex = $target[0].id
         $target.toggleClass('locked')
         $target.toggleClass('btn')
         $siblings = $('.language').siblings()
         for (let i = 0; i < 10; i++){
            $($siblings[i]).toggleClass('locked')
            $($siblings[i]).toggleClass('btn')
         }
         $('.content').empty()
         console.log(applyFilters(languageIndex, countryIndex, countryIndex, keyword));
         // ajaxCall(applyFilters(languageIndex, countryIndex, categoryIndex))
      }
   })
//----------------------------------category filter-----------------------
   $('.topicBtn').on('click' , (eve) => {
      if ($(eve.currentTarget).hasClass('locked')=== true){
      } else {
         $(eve.currentTarget).toggleClass('on')
         categoryFilter = $(eve.currentTarget)
         categoryIndex = eve.currentTarget.innerText;
         $siblings = $(eve.currentTarget).siblings()
         for (let i = 0; i < 6; i++){
            $($siblings[i]).toggleClass('locked')
            $($siblings[i]).toggleClass('btn')
         }
         $('.content').empty()
         console.log(applyFilters(languageIndex, countryIndex, countryIndex, keyword));
         // ajaxCall(applyFilters(languageIndex, countryIndex, categoryIndex))
      }
   })
//---------------------------------keyword filter-----------------------
   $('#searchButton').on('click', () => {
      keywordFilter = true
      const inputValue = $('#searchInput').val()
      keyword = inputValue
      $('.content').empty()
      console.log(applyFilters(languageIndex, countryIndex, countryIndex, keyword));
      ajaxCall(applyFilters(languageIndex, countryIndex, categoryIndex, keyword))
   })

//-------------------------------------country filter-----------------
   $('.flag').on('click' , (event) => {
      countryIndex = (event.target).id;
      console.log(countryIndex);
      countryFilter = true
      $('.content').empty()
      console.log(applyFilters(languageIndex, countryIndex, countryIndex, keyword));
      ajaxCall(applyFilters(languageIndex, countryIndex, countryIndex, keyword))

   })
//-------------------------------filters toggle--------------------------------
   $('.filterButton').on('click' , () => {
      $('.languageSelect').toggleClass('is-active')
      $('.topicSelect').toggleClass('is-active')
   })
//-------------------------------------------------------------------------------------
})
//------=--WARNINGGGG----^^^^^^^^^^^^^^^^^^^-DO NOT CROSS THIS LINE^^^^^^^^^^^^^------

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
      const $date = $('<p>').addClass('info').text(date).appendTo($info)
      const $description = $('<p>').addClass('info').text(description).appendTo($info)

      const $url = $('<a>').addClass('info').text(url).appendTo($info)
      const $img = $('<img>').attr('src',img).appendTo($images)
   }
}
//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE---!!!!!!!!!!!!!!!!!!------------
const ajaxCall = (url) => {
   $.ajax(
      {
            url: url
      }
   ).then(
      (data) => {
         let array = Object.values(data.data)
         printData(array)
      },
      () => {
         console.log("failed to get data");
      }
   )
}
//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE----!!!!!!!!!!!!!!-----------
const applyFilters = (language, country, category, keyword) => {
    languages =`&languages=${language}`
    countries = `&countries=${country}`
    categories = `&cetegories=${categoryIndex}`
    keywords = `&keywords=${keyword}`
    ajaxUrl = `http://api.mediastack.com/v1/news?access_key=${key}&date=${startDate},2021-12-31&limit=100`

   if (keywordFilter ===true) {////////changes query based on filters.
      ajaxUrl = ajaxUrl + keywords
   }
   if (countryFilter === true){
      ajaxUrl = ajaxUrl + countries
   }
   if (languageFilter.hasClass('on')=== true){
      ajaxUrl = ajaxUrl + languages
   }
   if (categoryFilter.hasClass('on')===true){
      ajaxUrl = ajaxUrl + categories
   }
   return ajaxUrl
}
