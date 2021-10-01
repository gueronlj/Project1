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

let keyword = null
let countryIndex = allCountries[0]
let languageIndex = allLanguages[2]
let categoryIndex = allCategories[5]

const key = 'ad5efa85ecde97e26bac1ae906948e4a'
let startDate = '2021-08-24'
let keywords = `&keywords=${keyword}`
let countries = `&countries=${countryIndex}`
let languages = `&languages=${languageIndex}`
let categories = `&cetegories=${categoryIndex}`
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

$(() => {

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
