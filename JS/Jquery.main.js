$(document).ready(function() {
      

// Toggling the categories list

$('.upperMenu .categories span').on('click', function() {

    $('.upperMenu .categories ul').slideToggle();
})
    
$(window).on('keydown', function(e) {
    
    if (e.keyCode == 27) {
        
        $('.upperMenu .categories ul').slideUp();
    }
})
    
$(window).on('click', function(e) {
    
    if (!$('.upperMenu .categories').is(e.target) && $('.upperMenu .categories').has(e.target).length == 0) {

        $('.upperMenu .categories ul').slideUp();
        
    }
    
})
    
  
// Calc the price of the item

$('.banners .banner2 .carousel-item').each(function() {
    
    var discount = ($(this).find('.value').text() *                          $(this).find('.oldPrice').text()) / 100,
        
        newPrice = $(this).find('.oldPrice').text() - discount;
    
    $(this).find('.price').text(newPrice);
    
})
    
 
// The gallery Preview
    
    // previewing Items
    
$('.preview').on('click', function() {
    
    $('.gallery-preview').find('img').attr('src', $(this).parent().find('img').attr('src'));
    
    $(this).parent().find('.price, .rate, .itemName').clone(true).prependTo('.gallery-preview .item-label');
    
    $('.gallery-preview').fadeIn();
    
})
    
    // Closing gallery-preview
    
    //(1)
    
$('.gallery-preview .close').on('click', function () {
    
    $('.gallery-preview').fadeOut().find('.item-label').empty();
})
    
    //(2)
    
$(window).keydown(function(e) {
        
    if (e.keyCode == 27) {
            
        $('.gallery-preview').fadeOut().find('.item-label').empty();
    }
})
    
    //(3)
    
$('.gallery-preview').on('click', function () {
    
    $(this).fadeOut().find('.item-label').empty();
})
    
$('.gallery-preview .row').on('click', function (e) {
    
    e.stopPropagation();
})
    

// Saved List
    
    // Saving items 
    
$('.save').on('click', function() {
    
    var itemNum = $(this).parents('.product').attr('data-num');
        
    if ($('.saved .saved-item[data-num=' +itemNum+ ']').length == !0) {
            
        alert('You have added this item before');

    } else {

        var newItem = $('.saved .saved-item').eq(0).clone();

        $(this).parent().find('img, .itemName, .price, .Add').clone(true).prependTo(newItem);

        newItem.attr('data-num', $(this).parents('.product').attr('data-num'));

        $('.saved .saved-body').append(newItem);
        
        $('.saved-body .saved-item:odd').each(function() {
            
            $(this).css('background-color', '#D4D4D4');
        })
        
        $('.alert-container .alert').text('The item has been added to your wishlist');
        
        $('.alert-container').fadeIn(function() {
            
            $(this).delay(1000).fadeOut();
        });
  
    }
})    
    
$('.wishList').on('click', function() {
    
    $('.saved').fadeIn();
    
})
    
$('.saved .clear').on('click', function() {
    
    $('.saved .saved-item').not(":first-of-type").remove();
})
    
    
    // Closing saved List

    //(1)
    
$('.saved .close').on('click', function() {
    
    $('.saved').fadeOut();
})
    
    //(2)
    
$('.saved').on('click', function() {
    
    $('.saved').fadeOut();
})
    
$('.saved .saved-body').on('click', function(e) {
    
    e.stopPropagation();
    
})
    
    //(3)
        
$(window).on('keydown', function(e) {
    
    if (e.keyCode == 27) {
        
        $('.saved').fadeOut();
    }
})
    
    
// Counting down the offer 
    
var SecCounter = setInterval(function() {
    
    $('.banner2 .carousel-item .counter .secs').each(function() {
    
        var seconds = parseInt($(this).text());
        
        if (seconds == 0) {
            $(this).text(60);
             
        } else {
            $(this).text(seconds - 1); 
        }
    });
        
}, 1000);
    
var MinCounter = setInterval(function () {
    
    $('.banner2 .carousel-item .counter .mins').each(function() {
        
        var mins = parseInt($(this).text());
        
        if (mins == 0) {
            $(this).text(60);
             
        } else {
            $(this).text(mins - 1);
        }
        
    })    
    
}, 60000);
    
                                   
// Actions of the Cart
    
    // Toggling the cart body 

$('.upperMenu .cart .cart-btn').on('click', function () {
    
    $('.cart .cart-body').fadeToggle();
    
})
    
    // Closing the Cart
    
$(window).on('click', function(e) {
        
    if (!$('.cart').is(e.target) && $('.cart').has(e.target).length == 0) {
        
        $('.cart .cart-body').fadeOut();
    }
}) 
     
$('.Add').on('click', function() {
    
    var itemNum = $(this).parents('.product').attr('data-num');
    
    if ($('.cart-body .item[data-num=' +itemNum+ ']').length == 0) {
        
        // (1)inserting items in the cart
        
        var newItem = $('.cart-body .item').eq(0).clone();

        $(this).parents('.product').find('img, .itemName, .price').clone().appendTo(newItem);
         newItem.find('.price').text($(this).parents('.product').find('.price').text() * $(this).siblings('.item-counter').val());
        
        newItem.find('.price').before('<span class="count"></span>');
        
        newItem.find('.count').text($(this).siblings('.item-counter').val());

        newItem.attr('data-num', $(this).parents('.product').attr('data-num'));

        $('.cart-body .total').before(newItem);
        
        $('.cart-body .item:odd').each(function() {
            
            $(this).css('backgroundColor', '#CECCCA');
        })
        
        // (2)Counting items number in cart
        
        var itemsCount = 0;
        
        $('.cart-body .item .count').each(function() {
            
            itemsCount += parseInt($(this).text());
        })

        $('.cart .itemsNum').text(itemsCount);
    
        // (3)Calculating the total of the cart items 

        var total = 0;

        $('.cart-body .item .price').each(function() {

            total += parseInt($(this).text());

            $('.cart-btn .price').text(total);

            $('.cart-body .value').text(total);

        })

        $('.alert-container .alert').text('The item has been added to your cart');
        
        $('.alert-container').fadeIn(function() {
            
            $(this).delay(1000).fadeOut()
            
        });
        
    } else {
        
        // (1) Updating item price in the cart
    
        $('.cart-body .item[data-num=' +itemNum+ '] .price').text($(this).parents('.product').find('.price').text() * $(this).siblings('.item-counter').val());
        
        $('.cart-body .item[data-num=' +itemNum+ '] .count').text($(this).siblings('.item-counter').val());
        
        // (2) Updating the total of the cart items
        
        var total = 0;

        $('.cart-body .item .price').each(function() {

            total += parseInt($(this).text());

            $('.cart-btn .price').text(total)

            $('.cart-body .value').text(total);

        })
        
        // (3) Updating items number in cart
        
        var itemsCount = 0;
        
        $('.cart-body .item .count').each(function() {
            
            itemsCount += parseInt($(this).text());
        })

        $('.itemsNum').text(itemsCount);
        
        $('.alert-container .alert').text('The item has been added to your cart');
        
        $('.alert-container').fadeIn(function() {
            
            $(this).delay(500).fadeOut()
            
        });

    }
    
    // Removing items from the cart
    
    $('.cart-body .item .del').on('click', function(e) {
        
        e.stopPropagation();
                
        total -= parseInt($(this).siblings('.price').text());
                
        $('.cart-btn .price').text(total)
        
        $('.cart-body .value').text(total);
        
        $(this).parent().remove();
        
        $('.itemsNum').text($('.cart-body .item').length - 1);
    })
    
})
    
 // --------------------------------------------------------
    
// Width of the product 
    
$(function() {
    
    if ($(window).width() > 992) {
    
        $('.products-slider .product').width($('.products-show').width() / 5); 
        
    } else if ($(window).width() > 768) {
        
        $('.products-slider .product').width($('.products-show').width() / 3);
        
    } else {
        
        $('.products-slider .product').width($('.products-show').width() / 2);
    }

    
})
    
    
// Sliding products slider 
    
$('.products-show .right').on('click', function() {
    
    if ($(this).parents('.products-show').find('.product:last-of-type').position().left >=  $('.products-show').width() ) {
        
        $(this).parent().siblings('.products-slider').animate({
        
        marginLeft: '-=' + $('.products-slider .product').width()
        })
        
    } 
      
})
    
$('.products-show .left').on('click', function() {
    
    if ($(this).parents('.products-show').find('.product:first-of-type').offset().left < $('.products-show').offset().left) {
        
    $(this).parent().siblings('.products-slider').animate({
        
        marginLeft: '+=' + $('.products-slider .product').width()
        
    })
    }
})
    
// Scrolling up arrow 
     
$(window).on('scroll', function() {
        
    if ($(window).scrollTop() >= 800) {

    $('.fa-angle-double-up').show();

    } else {

    $('.fa-angle-double-up').hide().stop(true);

    }
})
    
 $('.fa-angle-double-up').on('click', function() {
     
     $('html').animate({
         
         scrollTop: '0px'
     });
 })
    

    

        
})