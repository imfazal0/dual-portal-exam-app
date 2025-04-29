const button = document.querySelector('.login-button')



button.addEventListener('click', ()=>{
    
    let userid =  document.getElementById('userid').value
    let password = document.getElementById('password').value
    userid = stringToHex(userid);
    password = stringToHex(password);
    
    if (userid === '696d66617a616c30' && password ==='323432303031') {
        console.log(
            'login-success'
        )
        const page = document.querySelector('.login-page')
            page.innerHTML = '';
            page.style.display = 'none';
            page.style.positon = 'none';
            page.style.width = '0px';
            page.style.backgroundColor = 'transparent';
            const page2 = document.querySelector('.question-page');
            page2.style.positon='fixed';
    }
    else{
        alert("Password or Id is incorrect  :: login failed")
        console.log('login-failed');
        
    }

});


function stringToHex(str) {
    let hexString = '';
    for (let i = 0; i < str.length; i++) {
      hexString += str.charCodeAt(i).toString(16);
    }
    return hexString;
  }
  


  