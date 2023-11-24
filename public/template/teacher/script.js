function menuToggle(){
  const toggleMenu = document.querySelector('.menu');
  toggleMenu.classList.toggle('active')
} 

const allIndicator = document.querySelectorAll('.indicator li');
const allContent = document.querySelectorAll('.tab-content li');

allIndicator.forEach(item=> {
  item.addEventListener('click', function () {
    const content = document.querySelector(this.dataset.target);

    allIndicator.forEach(i=> {
      i.classList.remove('active');
    })

    allContent.forEach(i=> {
      i.classList.remove('active');
    })

    content.classList.add('active');
    this.classList.add('active');
  })
})

function showTab(tabId){
  var tabs = document.getElementsByClassName('tab-content');
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active-tab');
      }

      // Show the selected tab
      var selectedTab = document.getElementById(tabId);
      selectedTab.classList.add('active');
}

