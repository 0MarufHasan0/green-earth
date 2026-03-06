
console.log('hello')

const categoriesContainer = document.getElementById("categoriesContainer")
const treesContainer = document.getElementById("treesContainer")
const loadingSpinner = document.getElementById("loadingSpinner")

//  button

async function loadCategories (){
    
// async await

const res = await fetch("https://openapi.programming-hero.com/api/categories");

const data = await res.json()

data.categories.forEach(category => {

    console.log(category)
    const btn = document.createElement('button')
    btn.className="btn btn-outline w-full"
    btn.textContent =category.category_name
    btn.onclick = ()=> selectCategory(category.id,btn)
    categoriesContainer.appendChild(btn)


})
}

// btn active

async function selectCategory(categoryId ,btn) {
    console.log(categoryId,btn)
    showLoading();
   


 const allBtn =   document.querySelectorAll('#categoriesContainer button ,#allTreesBtn')

 allBtn.forEach(btn => {

    btn.classList.remove("btn-primary")
    btn.classList.add("btn-outline")
 })


  btn.classList.add("btn-primary")
  showLoading()
    btn.classList.remove("btn-outline")

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    const data = await res.json()
    // console.log(data)
    hideLoading()
    displayTrees(data.plants)

    
}

function showLoading(){
    
    loadingSpinner.classList.remove("hidden")
    loadingSpinner.classList.add("flex")
    treesContainer.innerHTML=''

}

function hideLoading(){

  loadingSpinner.classList.add("hidden")
}

// trees

async function loadTrees() {
    showLoading()

    loadingSpinner.classList.remove("hidden")
    
    const res= await fetch("https://openapi.programming-hero.com/api/plants")
    const data = await res.json()
    hideLoading()
    displayTrees(data.plants)
    
}

function displayTrees (trees){

    console.log(trees)
    trees.forEach(tree => {
        const treeCard=document.createElement("div")
        treeCard.className="card bg-base-100  shadow-sm"
        treeCard.innerHTML=`
        
        
         <figure>
    <img
      src="${tree.image}"
      alt="${tree.name}"
      title = "${tree.name}"
      class="h-48 w-full object-cover" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${tree.name}</h2>
    <p class="line-clamp-2">${tree.description}</p>
    <div class="badge badge-outline">${tree.category}</div>
    <div class="card-actions justify-between items-center">
        <h2 class="font-bold text-xl text-[#15803D]">${tree.price}</h2>
      <button class="btn btn-primary">add</button>
    </div>
  </div>
        
        
        
        
        
        
        
        
        `

        
        


         
 
treesContainer.appendChild(treeCard)



    })

}


loadCategories()
loadTrees()