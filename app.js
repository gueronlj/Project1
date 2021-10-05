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
const settings = {
   country: '',
   language: '',
   category: '',
   keyword: '',
   startDate: '2021-09-24'
}

const key = '516fdd9b73f00bef1d2919450366c2d8'

//----------------WARNINGGGG--!!!!!!!!!!-----DO NOT CROSS THIS LINE---!!!!!!!!!!!!!!!!!!-------
$(() => {
//--------------------------------carousel----------------------------------------
   $flags =  $('.flag').siblings()
   $maxFlags = $('.flag').siblings().length
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
   })

   $('#previous').on('click', () => {
      if (currentImgIndex > 5){
         $('#scope').children().eq(currentImgIndex).hide()
         $('#scope').children().eq(currentImgIndex-6).show()
         currentImgIndex--
      } else {
         currentImgIndex = 5
      }
   })
//------------------------------language filter--------------------------------
   $('.btn').on('click' , (e) => {
      $target = $(e.currentTarget)
      if ($target.hasClass('locked')=== true){
      } else {
         settings.language = $target[0].id
         $target.toggleClass('on')
         $target.toggleClass('locked')
         $target.toggleClass('btn')
         $siblings = $('.language').siblings()
         for (let i = 0; i < 10; i++){
            $($siblings[i]).toggleClass('locked')
            $($siblings[i]).toggleClass('btn')
         }
         $('.content').empty()
      }
   })
//----------------------------------category filter-----------------------
   $('.topicBtn').on('click' , (eve) => {
      $target = $(eve.currentTarget)
      if ($target.hasClass('locked')=== true){
      } else {
         settings.category = eve.currentTarget.innerText;
         $target.toggleClass('on')
         $siblings = $(eve.currentTarget).siblings()
         for (let i = 0; i < 6; i++){
            $($siblings[i]).toggleClass('locked')
            $($siblings[i]).toggleClass('btn')
         }
         $('.content').empty()
      }
   })
//---------------------------------keyword filter-----------------------
   $('#searchButton').on('click', () => {
      const inputValue = $('#searchInput').val()
      settings.keyword = inputValue
      $('.content').empty()
      $('.languageSelect').removeClass('is-active')
      $('.topicSelect').removeClass('is-active')
      console.log(applyFilters(settings));
      ajaxCall(applyFilters(settings))
   })
//-------------------------------------country filter-----------------
   $('.flag').on('click' , (event) => {
      settings.country = (event.target).id;
      $('.content').empty()
      $('.languageSelect').removeClass('is-active')
      $('.topicSelect').removeClass('is-active')
      $('#whereP').text(settings.country)
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
   if (array.length > 0){
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
   }else{
      $('<div>').addClass('error').appendTo($('#content'))
      $('<h3>').text('Search found 0 articles...').appendTo($('.error'))
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
         console.log(url);
      },
      () => {
         console.log("failed to get data");
      }
   )
}
//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE----!!!!!!!!!!!!!!-----------
const applyFilters = (settings) => {
    languages =`&languages=${settings.language}`
    countries = `&countries=${settings.country}`
    categories = `&categories=${settings.category}`
    keywords = `&keywords=${settings.keyword}`
    ajaxUrl = `https://api.mediastack.com/v1/news?access_key=${key}&date=${settings.startDate},2021-12-31&limit=20&sort=published_desc`+languages+countries+categories+keywords
    return ajaxUrl
}
