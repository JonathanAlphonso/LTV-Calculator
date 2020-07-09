
//Budget Controller
var budgetController = (function() {
    //some code
    var Expense  = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income  = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };



    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc:0
        }
    };

    var mortgageDebt;
    var propertyValue;

    return {
        addItem: function(type, des, val){
            var newItem, ID;
            //ID = last ID + 1

            // Create new ID
            /*
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id +1;

            } else{
                ID = 0;
            }
            
            ID = 0;
            //create new item based on 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expense(ID,des,val);
            } else if (type === 'inc'){
                newItem = new Income(ID,des,val);
            }
            //push it into our data structure
            data.allItems[type].push(newItem);
            // return the new element
            return newItem;
            */
           

        },

        ltvRatio: function(mtgValue, propValue){
            var ltv = Math.round(mtgValue/propValue*100);
            console.log(ltv);
            return ltv;
            


        },


        testing: function(){
            console.log(data);
        }
    };



})();




// UI Controller
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        inputDebt: '.add__debt_value',
        inputPropValue: '.add__property_value',
        calcResults: '.LTV-Calc-Results'


    };


    //some code 
    return {
        getinput: function(){
            return {
                /*
                type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp for income and expenses
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
                */
               mtgValue:document.querySelector(DOMstrings.inputDebt).value,
               propValue:document.querySelector(DOMstrings.inputPropValue).value

            };

        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            //Create HTml string with placeholder text

            if(type === 'inc'){

            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div><div class="item clearfix" id="income-1"> <div class="item__description">Sold car</div><div class="right clearfix"> <div class="item__value">+ 1,500.00</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
        } else if (type === 'exp'){     
            element = DOMstrings.expensesContainer;       
            html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div><div class="item clearfix" id="expense-1"> <div class="item__description">Grocery shopping</div><div class="right clearfix"> <div class="item__value">- 435.28</div><div class="item__percentage">10%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
        }


            //Replace the placeholder text with some acttual data
            /*
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            */


            //Insert the HTML into the DOM
            //document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);





        },

        addLtv: function(ltv){
            var html, newHtml, element;
            element = DOMstrings.calcResults;
            html = `Your Loan-to-Value ratio is ${ltv}%`;
            

            var el = document.querySelector(element);

            // <a href="/javascript/manipulation/creating-a-dom-element-51/">create a new element</a> that will take the place of "el"
            var newEl = document.createElement('p');
            newEl.setAttribute('class', 'LTV-Calc-Results');
            newEl.innerHTML = `Your Loan-to-Value ratio is ${ltv}%`;
            if (!ltv){
                newEl.innerHTML = 'Your numbers are not valid. Please check your inputs and try again.';
            }

            // replace el with newEL
            el.parentNode.replaceChild(newEl, el);





        },


        getDOMstrings: function(){
            return DOMstrings;
        }
    };

})();

//Global App Controller
var controller = (function(budgetCtrl, UICtrl){
var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event){
        
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

}

    

    var ctrlAddItem = function(){
        var input, newItem;
        //1. Get the field input data

        input = UICtrl.getinput();
        console.log(input);
        //2. Add the item to the budget controller
        //newItem = budgetCtrl.addItem(input.type,input.description, input.value);
        newItem = budgetCtrl.ltvRatio(input.mtgValue, input.propValue);
        console.log(newItem);
        //3. Add the item to the UI
        //UICtrl.addListItem(newItem, input.type);
        UICtrl.addLtv(newItem);
        //4. Calculate the budget
        //5. Display the budget on the UI
        
    };

    return{
        init:function(){
            console.log('App has started.');
            setupEventListeners();
        }

    }

    

})(budgetController, UIController);

controller.init();