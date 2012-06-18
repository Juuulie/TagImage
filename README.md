<h1>TagImage</h1>
TagImage is a jQuery Plugin to edit tags on images. <br />
You can do a selection on an image to tag a person or to write a review.
<br />
<br />
Check out the <a href="http://www.juliepellerin.com/plugin_tagimage/">demo page</a>.

<h1>Usage</h1>

<h3>How to install it ?</h3>
To use the plugin you first have to add jQuery in your head section :
<pre><code>&lt;script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.js"&gt; &lt;/script &gt;</code></pre>

Then, you need to install the script jquery.plugintag.js in your head section :
<pre><code>&lt;script type="text/javascript" src="jquery.plugintag.js"&gt; &lt;/script&gt;</code></pre>


<h3>How to use it ?</h3>
It can be used on one image at a time

Add an image in the html :
<pre><code>&lt;img id="tagimage" src="img/family.jpg" alt="groupe" title="groupe"  /&gt;
</code></pre>

and load the plugin :		
<pre><code>&lt;script>
	$(document).ready(function(){
		$("#tagimage").tagImage();
	});	
&lt;/script&gt;</code></pre>

<br />
To positionate the picture with margin properties, <br />
you have to define properties for <code>#image-view</code>.

For example :
<pre><code>#image-view{
	margin-left:70px;
	margin-bottom:30px;	
}</code></pre>		


<h1>Options</h1>

<h3>removable</h3>
If user can delete tags on the picture. <br />
default value : true <br />
possible values : true/false <br />

<h3>updatable</h3>
If user can update tags on the picture. <br />
default value : true <br />
possible values : true/false <br />




<h1>On witch browser does it work ?</h1>
This plugin was tested on FF 12.0, Safari 5.1.5, Google Chrome 20.0.1132.11    


