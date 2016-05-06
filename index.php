<?php
$path = "uploads/";
$image = "";
umask(0);
?>
<html>
<head>
<title>Face Symmetry</title>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/imgareaselect-default.css" />
<script type="text/javascript" src="scripts/jquery.min.js"></script>
<script type="text/javascript" src="scripts/jquery.imgareaselect.pack.js"></script>
</head>

<script type="text/javascript">
function getCropImage(im,obj) //type image and object is obj.
{
	var x_axis = obj.x1;
	var x2_axis = obj.x2;
	var y_axis = obj.y1;
	var y2_axis = obj.y2;
	var thumb_width = obj.width;
	var thumb_height = obj.height;

	$.ajax({
		type:"GET",
		url:"flipimage.php?t=ajax&img="+$("#image_name").val()+"&w="+thumb_width+"&h="+thumb_height+"&x1="+x_axis+"&y1="+y_axis,
		cache:false,
		success:function(response)
		{ 
			//$("#cropimage").hide(); //hides the form.
			$("#thumbs").html("");
			$("#thumbs").html("<img src='uploads/"+response+"' width='700px' height='300px'/>");
		}
	});
}

$(document).ready(function () {
    $('img#photo').imgAreaSelect({  //img#photo is the object and the imgAreaSelect is the function, which invokes the plugin.
		maxWidth: 1,
	//	maxHeight: 1,
        onSelectEnd: getCropImage
    });
});
</script> 
<?php

	$valid_formats = array("jpg", "jpeg", "png", "gif", "bmp","JPG", "PNG", "GIF", "BMP", "JPEG");
	$maxImgSize = 5*1024*1024;
	$randomName = md5(uniqid().date("Y-m-d H:i:s")); //randomName generators for the photo
	if(isset($_POST['submit']))
		{
			$name = $_FILES['photoimg']['name'];
			$size = $_FILES['photoimg']['size'];
			
			if(strlen($name))
			{
				list($txt, $ext) = explode(".", $name); // suppose atma.JPG is the image then $txt= atma and $ext=JPG it separates by '.'
				if(in_array($ext,$valid_formats) && $size < $maxImgSize) //in_array function checks if the $ext value is present in the array $valid_formats
				{
					$randomImageName = $randomName.".".$ext;
					$tmp = $_FILES['photoimg']['tmp_name']; //temporary location in the browser
					if(move_uploaded_file($tmp, $path.$randomImageName)) //this function takes three arguments temporary location in the browser ie.. $tmp, directory where it stores $path, what should be the name of the file in the server $randomImageName
																			// if the file is successfully uploaded then assign $image		
					{
						$image="<div>Please select the portion</div><img src='uploads/".$randomImageName."'  >"; //image id is photo and resizing is done in style.css file.
					}
					else {
						if ($_FILES["photoimg"]["error"] > 0)
						{
							echo "Error: " . $_FILES["photoimg"]["error"] . "<br>";
						}
					}
				}
				else
				{
					if($_FILES["photoimg"]["size"] > $maxImgSize)
						echo "Maximum file size exceeded";
					else
						echo "Invalid file";
				 }
			}
			else
				echo "Please select a image";
		}
?>
<body>
	<div>
		<div>
			<form id="cropimage" method="post" enctype="multipart/form-data">
				Upload your image 
				<input type="file" name="photoimg" id="photoimg" />
				<input type="hidden" name="image_name" id="image_name" value="<?php echo($randomImageName)?>" />
				<input type="submit" name="submit" value="submit" />
			</form>
		</div>
		<div>
			<div>
				<?php if($image != '')
				{ 					
					echo $randomImageName;
					$image_path= "uploads/".$randomImageName; //path of the image.
					
					//echo $image; //displaying image without editing
					
					$src = imagecreatefromjpeg($image_path); 		//this creates a memory reference of the image.
					list($width, $height) = getimagesize($image_path);	//this function gets the width and height of the image.
					
					$new_width = 300;
					$new_height = ($height / $width)* $new_width;
					
					$tmp = imagecreatetruecolor($new_width, $new_height); //creates a temporary image with new width and height
					
					imagecopyresampled($tmp, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height); 
					
					imagejpeg($tmp, $image_path, 100); //copies the resized temporary image to the provided image path
					
					imagedestroy($src); //destroying the memory reference and the temporary image
					imagedestroy($tmp);
					
					 $modified_image = "<img src=\"$image_path\" id=\"photo\">"; //echoing image after altering its size.
					 
					 echo $modified_image;
					
					
				}
				?> 
			</div>
			<div id="thumbs" style="margin-top:40px;"></div>
		<div>
	</div>
</body>
</html>
