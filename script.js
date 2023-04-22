class FormUpdator {
    inputs = document.querySelectorAll('input');
    checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    radios = document.querySelectorAll('input[type="radio"]')
    select = document.querySelector('select');
    fixedPrice = document.querySelector('fixedPrice');
    entrypPrice = document.querySelector('#EntryPrice')
    totalPriceEl = document.querySelector('.totalPrice')
    totalPrice = 40_000;
    price = 0;


    mainCalculator() {
        [...this.inputs, this.select].forEach(el => el.addEventListener('change', (e) => {
        this.totalPriceEl.style.animation = 'waiting .7s infinite linear'; 
            this.totalPriceCounter();
            this.waiting();
        }))
    }



    totalPriceCounter() {
       try {

         // ** 1

         if(this.entrypPrice.value !== "") this.price = (this.totalPrice - +this.entrypPrice.value)
         if(this.entrypPrice.value === "") throw new Error('add entry price')

         // ** 2
 
         Array.from(this.radios).filter(e => e.checked).map(e => {
             e.value
             this.price += this.price * +e.value / 100;
         })
 
         // ** 3
 
         const checkedInputs = [...this.checkBoxes].filter(e =>e.checked).map(e => +e.value).reduce((acc, e) => e + acc)
         this.price += checkedInputs
         console.log(checkedInputs);
       
 
         // ** 4
 
         this.price /= +this.select.value;
      }
  
     catch (error) {
        console.log(error);
        
       }
    }

    waiting() {
        setTimeout(()=>{
            this.totalPriceEl.textContent = `${this.price.toFixed(2)}$`
            this.totalPriceEl.style.animation = 'none'
        } , 2000)
    }

}

const instance = new FormUpdator();
instance.mainCalculator();