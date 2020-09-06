function expand(x)
{   console.log("called")
    document.getElementById(x).style.display="block";
}
function contract(x)
{
    document.getElementById(x).style.display="none";
}
$(document).ready(function(){
$('.navbar-nav .nav-item a').click(function(){
    $(this).closest('.nav-item').siblings().removeClass('active');
    $(this).closest('.nav-item').addClass('active');
    
})
$('.submit-button').click(()=>
{
    alert('form submitted successfully')
})
});
