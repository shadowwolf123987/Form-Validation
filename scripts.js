
document.addEventListener("DOMContentLoaded", function() {

var nameInput = document.getElementById("nameInput")
var emailInput = document.getElementById("emailInput")
var cardInput = document.getElementById("cardInput")

nameInput.addEventListener("keyup", function(){ validate(nameInput) })
emailInput.addEventListener("focusout", function(){ validate(emailInput) })
cardInput.addEventListener("focusout", function(){ validate(cardInput) })

var nameValidation = document.getElementById("nameValidation")
var emailValidation = document.getElementById("emailValidation")
var cardValidation = document.getElementById("cardValidation")

var submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click", submit)

function validate(element) {
    var type = element.name

    var nameReg = /[^a-zA-Z ]/
    var cardReg = /[^0-9 -]/
    //Returns True to reg.test if any characters aren't in the included sequence of characters
    
    if (type == "name") {

        if(nameReg.test(element.value)){
            updateValidation(element.name, false, "Invalid Characters Detected")
            return false;
        }

    }

    if (type == "email") {

        if(element.checkValidity() == false) {
            updateValidation(element.name, false, "Invalid Email Formatting Detected")
            return false;
        }

    }

    if (type == "card") {

        if(cardReg.test(element.value)){
            updateValidation(element.name, false, "Invalid Characters Detected")
            return false;
        }

        else{
            var cardNum = element.value.toString()

            cardNum = cardNum.replaceAll(" ","")
            cardNum = cardNum.replaceAll("-","")

            var len = cardNum.length
            var oddEven = (len-1) % 2 //Used to identify if the value is odd or even and as such whether to skip it
            var sum = 0

            for (i=len-1;i>-1;i--) {
                currInt = parseInt(cardNum[i])
                
                if(i%2 != oddEven){
                    
                    if(currInt*2 > 9) {
                        tempVal = (currInt*2).toString()
                        sum += parseInt(tempVal[0]) + parseInt(tempVal[1])
                    }
                    
                    else{
                        sum += currInt*2
                    }
                }

                else{
                    sum += currInt
                }
            }

            if (sum % 10 == 0) {
                updateValidation(element.name, true)
                return true
            }

            else{
                updateValidation(element.name, false, "Valid Card Number not Entered")
            }
        }

    }

    else {
        updateValidation(element.name, true)
    }

}

function updateValidation(type, isValid, message) {
    var validation = document.getElementById(type+"Validation")

    if (isValid == false) {
        validation.innerHTML = message
        validation.setAttribute("data-validation", "false")
    }

    else if (isValid == true) {
        validation.innerHTML = ""
        validation.setAttribute("data-validation", "true")
    }
}

function submit() {
    if (nameValidation.getAttribute("data-validation") == "true" && emailValidation.getAttribute("data-validation") == "true" && cardValidation.getAttribute("data-validation") == "true") {
        alert("Wasn't sure if I am meant to include code for sending an email, as that would require PHP to do")
        window.open(`mailto:test@dn-uk.com?subject=Submitted%20Form&body=Name: %20 ${nameInput} %0a%0a Email: %20 ${emailInput} %0a%0a Card: %20 ${cardInput}`)
    }
}

})