(function( $ ){

	$.fn.tagImage = function( options ) {  
    // Paramètres de base du plug
    	this.pluginName = 'tagImage';
    	var settings = $.extend( {
			removable : true, 		// to remove a tag
			updatable : true, 		// to update a tag
			notesize  : "50px", 	// to change the size of the square
						
		}, options);
		

		img = $(this);
		var edit = true;
		var compteur = 0;
		var opac = true;

	
		var positioni = img.offset();
		var img_posleft = positioni.left;
		var img_postop = positioni.top;

	
		var imgWidth = img.width(); 
		var imgHeight =img.height(); 
		img.wrap('<div id="image-view"></div>');
		$("#image-view").css({
			width : imgWidth,
			height: imgHeight,
			position:"relative",
		});
		img.css("cursor","pointer");
		
		var marg = $("#image-view").css("marginLeft");
		var px = marg.indexOf('px');
		var margi = marg.slice(0,px);
	    
// ------------------------------------------------------------------------
	    return this.each(function() {  
	    		    	
			img.click(function(e){	
				if(edit == true){
					addTag(e);
				}							
	  		});
	  		
	  		// create a data for this element
	  		if (!$.data(this, 'plugin_' + this.pluginName)) {
	  			$.data(this, 'plugin_' + this.pluginName,{tags:[]});
	  		}
	  		
	  		viewTag(options.result);

	    });
// ------------------------------------------------------------------------

// - Put existing tags ------------------------------------------------------
		
		// View existing tags
		function viewTag(tab){
			
			for(var i=0; i<tab.length; i++){
				
				var obj = tab[i].object;
	
				//var note = tab[i].object;
				var tagTexte = tab[i].value;
	
				var posx = tab[i].x-(parseInt(settings.notesize)*0.5);
				var posy = tab[i].y+(parseInt(settings.notesize)*0.5)-5;
				
				var noteBlock = $('<div class="note-block" style="position:absolute; top:'+posy+'px; left:'+posx+'px"></div>');
				$("#image-view").append(noteBlock);
				noteBlock.append(obj);
				
				SaveSetTag(tab[i]);
			}
					
		}


		// Put existing tags on image	
		function SaveSetTag(tab){	
    		compteur++;
    		edit = true;
		
    		var tagTexte = tab.value;
    		tagBlockTexte = $('<div class="notetexte"><p class="note-p">'+tagTexte+'</p></div>')

    		tab.object.attr("id","notedef"+compteur);

			var note = $("#notedef"+compteur);
			$("#notedef"+compteur).addClass("view");    		

			note.css({ 
				border : "2px solid #191919", 
				opacity : "0.5",
				cursor : "pointer",
					width		: settings.notesize,
					height		: settings.notesize,
					border		:"2px solid #000",				
				})
				.after(tagBlockTexte);
				
			$(".notetexte").css({
				color			: "#fff",
				"font-family" 	: "arial",
				"font-size" 	: "12px",	
				"max-width" 	: "110px",
				 backgroundColor: "#191919", 
				 padding 		: "3px",
				 display 		: "none",	 
			});
			
    		$(".note-p").css({ margin : "0px",});

			var pos = {
				pageX : tab.x,
				pageY : tab.y,
			}					
				
			data = setTagData(pos,note,tagTexte);
						
			$("#notedef"+compteur)
				.mouseover(function(){
					if(opac == true){
						element = $(this);
						element.css({opacity : "1"});
						element.next().css({display : "block"});
					}else{
						element.next().css({display : "none"});						
					}	
				})
				.mouseout(function(){
					if(opac == true){
						element = $(this);
						element.css({opacity : "0.5"});					
						element.next().css({display : "none"});
					}else{
						element = $(this);
						element.css({opacity : "1"});					
						element.next().css({display : "none"});
					}
				})
				.click(function(){
					if(settings.updatable == true){
						if(edit == true){
							opac = false;
							
							element = $(this);
							element.next().css({display : "none"});	

							var posi = {
								pageX : tab.x+img_posleft+(parseInt(settings.notesize))+20,
								pageY : tab.y+img_postop+(parseInt(settings.notesize))-4,
							}				
							editTag(posi,element);
						}
					}
			});				
		}			


// - Add tag ----------------------------------------------------------------------------------------
		
		
		// Add a tag				
		function addTag(e){
			edit = false;
			createForm(e);
		}


// - Create a form ------------------------------------------------------------------------------------
		
		// Create a form
		function createForm(e,element,texte){
			textarea = texte || '';
			form = $('<div id="form-block"><form id="form"> <textarea id="textarea" name="tagtext" maxlength="100">'+textarea+'</textarea> </form></div>');        		     		

     		form.insertAfter(img);
     		
    		$("#form-block")
				.css({
					position		:"absolute",
					top 			: e.pageY-img_postop+(parseInt(settings.notesize)*0.5)+5+'px',
					left 			: e.pageX-img_posleft-margi-(parseInt(settings.notesize)*0.5)+'px',					
					zIndex 			: "9000",
					backgroundColor : "#191919",
					width 			: "114px",
					padding 		: "6px",
					border			: "1px solid #000"	
				});	
    		$("#textarea")
				.css({
					"min-height": "40px",
					"min-width" : "112px", 
					"max-height": "40px",
					"max-width" : "112px",
					padding		: "0px",
					margin 		: "0px",
					marginBottom: "4px"
				})
				.focus();	


	  		$("#textarea").click(function(){
	  			$(this).val("");
	  		});


			$("#textarea").css({"font-size":"12px", "color":"#666"});
			
			if(!element){ createTagSquare(e); }
			createButtonSubmit();
			if(!element){ createButtonCancel(); }
			if(element){
				createButtonCancel(element);
				if(settings.removable == true){
					createButtonRemove(e,element);
				}
			}		
	
			$('#form').submit(function() {
				opac = true;
				if(!element){
					setTag(e);
				}else{
					element.css({opacity : "0.5"});	
					updateTag(e,element);
				}
				return false;
			});			
		}		
		// Create a square
		function createTagSquare(e){
			var note = $('<div class="note-block"><div class="note"></div></div>');


			note.insertBefore($("#form-block"))
				.css ({
					position 	:"absolute",
					top 		: e.pageY-img_postop-(parseInt(settings.notesize)*0.5)+'px',
					left 		: e.pageX-img_posleft-margi-(parseInt(settings.notesize)*0.5)+'px',
				});
			$(".note").css({
					width  		: settings.notesize,
					height 		: settings.notesize,
					border 		: "1px solid #191919",	
			});
		}		
		// Create a submit button		
		function createButtonSubmit(){
	    	var submit = $('<input type="submit" id="tagsubmit" title="submit" value="OK" />');
	    	
	    	submit.insertAfter($("#textarea"))
	    		.css({
		    		backgroundColor : "#fff",
		    		color 			: "#000",
		    		fontSize 		: "10px",
		    		marginRight 	: "2px",
		    		width 			: "27px",
		    		border 			: "1px solid #000",
		    		cursor			: "pointer",
		    	});
		}		
		// Create a cancel button
		function createButtonCancel(element){
	    	var cancel = $('<input type="button" id="tagcancel" title="cancel" value="X" name="cancel" />');
	    	
	    	cancel.insertAfter($("#tagsubmit"))
				.css({
		    		backgroundColor : "#fff",
		    		color 			: "#000",
		    		fontSize 		: "10px",
		    		width 			: "27px",
		    		border 			: "1px solid #000",
	    			cursor			: "pointer",	
	    			});

			cancel.click(function() {
				opac = true;				
				edit = true;
				if(element){
					element.css({opacity : "0.5"});	
				}
				$("#form-block").remove(); 
				$(".note").remove();
			});										
	   	}
		
		// Create a remove button
		function createButtonRemove(e,element){
	    	var suppr = $('<input type="button" id="tagremove" title="delete" value="Delete" name="remove" />');
	    	suppr.insertAfter($("#tagsubmit"))
	    		.css({
		    		border 			: "1px solid #000",
		    		backgroundColor : "#fff",
		    		color 			: "#000",
		    		fontSize 		: "10px",
	    			marginRight 	: "2px",
	    			width 			: "54px",
	    			cursor			: "pointer",	    				    		
	    		});

			suppr.click(function() {
				edit = true;
				opac = true;
				element.remove();
				$("#form-block").remove();				

				for(var i=0; i<data.tags.length; i++){
					if(data.tags[i].x == e.pageX ){
						data.tags.splice(i,1);
					}
				}	
			});		
		}


// - Add a tag ------------------------------------------------------------------------------------

		// Add a new tag	
		function setTag(e){	
			compteur ++;						
    		edit = true;
		
    		var tagTexte = $('#textarea').val();
    		tagBlockTexte = $('<div class="notetexte"><p class="note-p">'+tagTexte+'</p></div>')
			$("#form-block").remove(); 

    		$(".note").attr("id","notedef"+compteur);
    		$(".note").addClass("view");    		
    		$(".note").removeClass("note");	

			var note = $("#notedef"+compteur);
			note.css({ 
				border : "2px solid #191919", 
				opacity : "0.5",
				cursor : "pointer",
				
				})
				.after(tagBlockTexte);
				
			$(".notetexte").css({
				color			: "#fff",
				"font-family" 	: "arial",
				"font-size" 	: "12px",	
				"max-width" 	: "110px",
				 backgroundColor: "#191919", 
				 padding 		: "3px",
				 display 		: "none",
			})
    		$(".note-p").css({ margin : "0px",});

			var pos = {
				pageX : e.pageX-img_posleft-margi,
				pageY : e.pageY-img_postop-(parseInt(settings.notesize))+4,
			}					
			
			data = setTagData(pos,note,tagTexte);
						
			$("#notedef"+compteur)
				.mouseover(function(){
					if(opac == true){
						element = $(this);
						element.css({opacity : "1"});
						element.next().css({display : "block"});
					}else{
						element.next().css({display : "none"});						
					}	
				})
				.mouseout(function(){
					if(opac == true){
						element = $(this);
						element.css({opacity : "0.5"});					
						element.next().css({display : "none"});
					}else{
						element = $(this);
						element.css({opacity : "1"});					
						element.next().css({display : "none"});
					}
				})
				.click(function(){
					if(settings.updatable == true){
						if(edit == true){
							opac = false;

							element = $(this);
							element.next().css({display : "none"});		
							editTag(e,element);
						}
					}
			});				
		}			
		// Save the new tag in the data 			
		function setTagData(e,note,tagTexte){
			var data = $(img).data('plugin_' + this.pluginName);

			data.tags.push({
				'object': note,
				'value' : tagTexte,
				'x'		: e.pageX,
				'y'		: e.pageY,
			});		
		
			return data;
		}


// - Edit a tag ------------------------------------------------------------------------------------
		
		// Edit an existing tag
		function editTag(e,element){
			edit = false;

			var texte = element.next().text();

			createForm(e,element,texte);						
		}
		// Change the tag
		function updateTag(e,element){
    		edit = true;
    		var tagTexte = $('#textarea').val();

    		element.next().html(tagTexte);
  		
			$("#form-block").remove(); 
			updateTagData(e,element,tagTexte);
		}
		// Save the modification in the data 
		function updateTagData(e,element,tagtexte){
			
			for(var i=0; i<data.tags.length; i++){
				if(data.tags[i].x == e.pageX ){
					data.tags[i].value = tagtexte;
				}
			}	
		}
	};
	
	$.fn.tagImage.getTags = function(){	
		return $(img).data('plugin_' + this.pluginName);	// return data
	}	
  
})( jQuery );