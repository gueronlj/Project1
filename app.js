// const printData = (dataObj,numberOfResluts) => {
//
// }

$(() => {
   const key = 'ad5efa85ecde97e26bac1ae906948e4a'
   const keywords = '&keywords=dogs'//sub corona for a variable based on user input.
   let ajaxUrl = `http://api.mediastack.com/v1/news?access_key=${key}`//default query

   if (keywords) {////////changes query based on filters.
      ajaxUrl = `http://api.mediastack.com/v1/news?access_key=${key}${keywords}`
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
