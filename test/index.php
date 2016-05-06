<?php
$path = "uploads/";
$image = "";
umask(0);
?>
<html>
<head>
<title></title>
</head>
<link rel="stylesheet" type="text/css" href="css/imgareaselect-default.css" />
<script type="text/javascript" src="scripts/jquery.min.js"></script>
<script type="text/javascript" src="scripts/jquery.imgareaselect.pack.js"></script>
<script type="text/javascript">
function getCropImage(im,obj)
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
			//$("#cropimage").hide();
			$("#thumbs").html("");
			$("#thumbs").html("<img src='uploads/"+response+"' width='700px' height='400px'/>");
		}
	});
}

$(document).ready(function () {
    $('img#photo').imgAreaSelect({
		maxWidth: 1,
//		maxHeight: 1,
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
						$image="<div>Please select the portion</div><img src='uploads/".$randomImageName."' id=\"photo\" >";
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
				<?php if($image != ''){ 
				echo $image; }//displaying image.
				?> 
			</div>
			<div id="thumbs" style="margin-top:40px;"></div>
		<div>
	</div>
</body>
</html>
