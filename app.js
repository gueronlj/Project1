//default query


$(() => {

   const allCountries = [
      'ar','au','at','be','br','bg','ca','cn','co','cz','eg','fr','de','gr','hk','hu','in','id','ie','il','it','jp','lv','lt','my','mx','ma','nl','nz','ng','no','ph','pl','pt','ro','sa','rs','sg','sk','si','za','kr','se','ch','tw','th','tr','ae','ua','gb','us','ve'
   ]

   const allLanguages = [
      'ar','de','en','es','fr','he','it','nl','no','pt','ru','se','zh'
   ]

   let countryIndex = allCountries[11]
   let languageIndex = allLanguages[4]

   const key = 'ad5efa85ecde97e26bac1ae906948e4a'
   let keywords = null
   let countries = `&countries=${countryIndex}`
   let languages = `&languages=${languageIndex}`
   let ajaxUrl = `http://api.mediastack.com/v1/news?access_key=${key}&limit=20`

   if (keywords) {////////changes query based on filters.
      ajaxUrl = ajaxUrl + keywords
   }
   if (countries){
      ajaxUrl = ajaxUrl + countries
   }
   if (languages){
      ajaxUrl = ajaxUrl + languages
   }

   $.ajax(
      {
            url:ajaxUrl
      }
   ).then(
      (data) => {
         console.log(data);





//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE--------!!!!!!!!!!!!!!!!!!!!!!---------------------------
      },
      () => {
         console.log("failed to get data");
      }
   )
})
//----------------WARNINGGGG!!!!!!!!!!!-----DO NOT CROSS THIS LINE--------!!!!!!!!!!!!!!!!!!!!!!---------------------------
