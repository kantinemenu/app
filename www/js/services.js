angular.module('starter.services', [])

.factory('Menu', function() {

  var menu = [{"name":"Revelsben","date":"2016-10-18","details":"i soya\/ingef\u00e6r marinade med sur\/s\u00f8d sauce og ris","url":"http:\/\/www.wipaway.dk\/5172\/revelsben","images":["http:\/\/bjarkesmadblog.weebly.com\/uploads\/3\/7\/7\/0\/37702449\/3540301.jpg?405","http:\/\/4.bp.blogspot.com\/--i-09LP-v7E\/UHq2PcKn8YI\/AAAAAAAACPE\/EhU_MvdgFyU\/s640\/IMG_2230.JPG","http:\/\/bjarkesmadblog.weebly.com\/uploads\/3\/7\/7\/0\/37702449\/5992182_orig.jpg","http:\/\/www.maduniverset.dk\/images\/okommentar\/18276-marinade.jpg","http:\/\/bjarkesmadblog.weebly.com\/uploads\/3\/7\/7\/0\/37702449\/9518724.jpg?409","http:\/\/4.bp.blogspot.com\/-mQNAOTtr8uQ\/UHq2S2mkCHI\/AAAAAAAACPM\/JqP9Di_vyWo\/s1600\/IMG_2240.JPG","http:\/\/1.bp.blogspot.com\/_MRb6kZAIiNI\/Sck0DmAfrKI\/AAAAAAAAA8g\/PCqlTGqUkPQ\/s400\/014.JPG","http:\/\/www.maduniverset.dk\/images\/okommentar\/18226-hvidkaalssalat.jpg","https:\/\/d1kga0hijum0zx.cloudfront.net\/recipe\/580x380\/98001495.jpg","http:\/\/2.bp.blogspot.com\/-RZshk-0Y1ew\/UI0zceJtSII\/AAAAAAAACdM\/NPxMrFmA5Fc\/s1600\/IMG_2292.JPG"]},{"name":"Svinekotelet","date":"2016-10-19","details":"med paprikasauce og pasta","url":"http:\/\/www.wipaway.dk\/5172\/svinekotelet","images":["http:\/\/nogetiovnen.dk\/wp-content\/uploads\/2013\/07\/DSC_6459kopi-700x464.jpg","http:\/\/www.maduniverset.dk\/images\/galleri\/7398RISRET_012.jpg","https:\/\/s-media-cache-ak0.pinimg.com\/originals\/6a\/19\/b4\/6a19b445dfe484275c2e0487a425ec4c.jpg","http:\/\/nogetiovnen.dk\/wp-content\/uploads\/2013\/07\/DSC_6459kopi-672x372.jpg","https:\/\/s-media-cache-ak0.pinimg.com\/originals\/73\/a3\/53\/73a3539299446e253a92963d4df1f1ff.jpg","http:\/\/i0.wp.com\/gourmetkongen.dk\/wp-content\/uploads\/2013\/01\/koteletter.jpg?resize=534%2C300","https:\/\/s-media-cache-ak0.pinimg.com\/originals\/b5\/c3\/1a\/b5c31ab5ae37440b5dd45655550e0a85.jpg","http:\/\/1.bp.blogspot.com\/-BKkHw3paSOM\/VYaNDkXlsbI\/AAAAAAAADOo\/9YBv_gXiUTI\/s1600\/DSC_0103k%2B689.jpg","https:\/\/s-media-cache-ak0.pinimg.com\/236x\/8f\/a7\/e2\/8fa7e211a7a192328f32c295685275d7.jpg","http:\/\/cdn2.billeder.madopskrifter.nu\/Images\/Meals\/WebMedium\/10263\/da\/Koteletter-i-fad-med-cocktailpoelser-og-champignon-11.jpg"]},{"name":"Coq au Vin","date":"2016-10-20","details":"med kartoffelmos","url":"http:\/\/www.wipaway.dk\/5172\/coq-au-vin","images":["http:\/\/www.cremefine.dk\/f\/f1\/Coq_au_vin.jpg","http:\/\/www.femina.dk\/sites\/femina.dk\/files\/styles\/full_height_8grid\/public\/media\/af3de42cb20642e99dc475cd888e7a2d.jpg","http:\/\/www.foodfanatic.dk\/wp-content\/uploads\/IMG_8213b1.jpg","http:\/\/www.isabellas.dk\/sites\/isabellas.dk\/files\/styles\/full_height_8grid\/public\/media\/article\/coq-au-vin-med-grov-kartoffelmos.jpg","http:\/\/www.webopskrifter.dk\/images\/420_468x234","http:\/\/www.isabellas.dk\/sites\/isabellas.dk\/files\/media\/article\/coq-au-vin-med-grov-kartoffelmos.jpg","https:\/\/s-media-cache-ak0.pinimg.com\/736x\/e3\/6d\/ab\/e36dab79055404bc154f8fae23267ded.jpg","http:\/\/www.holtevinlager.dk\/shop\/images\/upload\/Image\/Opskrifter\/Coq-au-Vin.gif","http:\/\/www.madogbolig.dk\/sites\/madogbolig.dk\/files\/styles\/full_height_8grid\/public\/media\/4b8250b6a64b4833b4585e510011160e.jpg","http:\/\/www.foodfanatic.dk\/wp-content\/uploads\/IMG_8165a.jpg"]},{"name":"\u0022McSimon\u0022","date":"2016-10-21","details":"Cheeseburger med h\u00e5ndsk\u00e5rne pommes frites og chipotle mayonnaise","url":"http:\/\/www.wipaway.dk\/5172\/mcsimon","images":["https:\/\/s-media-cache-ak0.pinimg.com\/originals\/73\/a3\/53\/73a3539299446e253a92963d4df1f1ff.jpg"]}];

  return {
    all: function() {
      return menu;
    },
    get: function(date) {
      console.log(date);
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].date === date) {
          return menu[i];
        }
      }
      return null;
    }
  };
});
