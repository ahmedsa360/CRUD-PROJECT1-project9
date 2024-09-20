let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount')
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit')


let mode = 'cereate';
let x ;

// get total
function getTotal(){
    if(price.value != ''){
      let result =  ( +price.value + +taxes.value + +ads.value) - +discount.value;
     
      total.innerHTML = result
      total.style.background= '#040'
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
  
}







// create product
// save localstorge
let datapro;
if(localStorage.product != null){
  datapro = JSON.parse(localStorage.product)
}else{
  datapro = [];
}


submit.onclick = function(){
  let newpro ={
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  }
  if(mode == 'cereate'){
    if(count.value > 1){
      for(let i = 0; i < count.value; i++)
      datapro.push(newpro)
    }else{
      datapro.push(newpro)
    }
    
  }else{
    datapro[x] = newpro;
    mode = 'cereate'
    submit.innerHTML = 'cereate'
    count.style.display = 'block'
  }

  localStorage.setItem('product' , JSON.stringify(datapro))
  console.log(datapro)
  cleardata()
  showdata()
  getTotal()
} 







// clear inputs
function cleardata(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = ''
}







// read
function showdata(){
  let table = '';
  for(let i = 0; i < datapro.length; i++ ){
     table += `
     <tr>
     <td>${i}</td>
     <td>${datapro[i].title}</td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
     <td><button onclick = "update(${i})" id="update">update</button></td>
     <td> <button  onclick = "deletedata(${i})" id="delete">delete</button></td>

 </tr>
     `
    
  }
   document.getElementById('tbody').innerHTML = table
   let deleteall = document.getElementById('deleteall')
   deleteall.style.margin = '10px 0'
   if(datapro.length > 0 ){
       deleteall.innerHTML = `
       <button onclick = 'deleteall()'> delete all (${datapro.length}) </button>
       `
   }else{
    deleteall.innerHTML = ''
   }
}

showdata()




// count
// delete
function deletedata(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro)
showdata()

}
function deleteall(){
  
  localStorage.clear()
  datapro.splice(0)
  showdata()
}






// update

function update(i){
  title.value = datapro[i].title
  price.value = datapro[i].price
  taxes.value = datapro[i].taxes
  ads.value = datapro[i].ads
  discount.value = datapro[i].discount
  category.value = datapro[i].category
  count.style.display = 'none'
  submit.innerHTML = 'update'
  getTotal()
  mode = 'update'
  x = i;
  scroll({
    top:0,
    behavior:"smooth"
  })
  
}

// search
let mood ;
function searchmode(id){
  let search = document.getElementById('search')
if(id == 'search-title'){
  mood = 'title';
  search.placeholder = 'search by title'
}else{
  mood = 'category'
  search.placeholder = 'search by category'
}
search.focus()
}

function searchdata(value){
  
  if(mode == 'title'){
     for(let i = 0; i < datapro.length; i++){
      if(datapro[i].title.includes(value)){
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "update(${i})" id="update">update</button></td>
        <td> <button  onclick = "deletedata(${i})" id="delete">delete</button></td>
   
    </tr>
        `
     
      }
        
     }
    
  }else{
    console.log('ahmed')
  }
  
}


// clean data