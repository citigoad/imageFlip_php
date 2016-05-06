<?php
$path = "uploads/";
umask(0);
function flip($image,$h=1,$v=0,$wid) 
{
	$width = imagesx($image);
	$height = imagesy($image);
	$temp = imagecreatetruecolor($width,$height);
	imagecopy($temp,$image,0,0,0,0,$width,$height);

	$image1 = imagecreatetruecolor($width,$height);
	imagecopy($image1,$image,0,0,0,0,$width,$height);

	$leftwidth = 2*$wid;
	$totWid = (2*$width);
	$finalImage = imagecreatetruecolor($totWid,$height);

	if ($h==1) {
		for ($x=0 ; $x<$width ; $x++) 
		{
			imagecopy($image1, $temp, $width-($x)-1, 0, $x, 0, 1, $height);
		}
	}

	for ($x=0 ; $x<=$wid ; $x++) 
	{
		imagecopy($finalImage, $image, $x, 0, $x, 0, 1, $height);
		imagecopy($finalImage, $image1, $leftwidth-($x), 0, $width-($x), 0, 1, $height);
	}

	$rightWidth = $totWid-$leftwidth;
	for ($x=0; $x<=$width-$wid; $x++) 
	{
		imagecopy($finalImage, $image, $totWid-$x, 0, $width-$x, 0, 1, $height);
		imagecopy($finalImage, $image1, $leftwidth+$x, 0, $x, 0, 1, $height);
	}

	return $finalImage;
}
if(isset($_GET['t']) and $_GET['t'] == "ajax")
{
	extract($_GET);

	$extension = strtolower(strrchr($img, '.'));
	$file = $path.$img;
    switch ($extension) {
        case '.jpg':
            $image = imagecreatefromjpeg($file);
            break;
        case '.gif':
            $image = imagecreatefromgif($file);
            break;
        case '.png':
            $image = imagecreatefrompng($file);
            break;
        default:
            $image = false;
            break;
    }

	$new_name = "flip".$img;
	$image = flip($image,1,0,$x1);
	header("Content-type: image/jpeg");
	imagejpeg($image,$path.$new_name,90);
	echo $new_name.'?'.time();
	exit;
}
?>
