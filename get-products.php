<?php

    $txtFile = file_get_contents("products.txt");
    $productsTxt = SplitString($txtFile, "\n");
    $jsonData = [];

    for ($i=0; $i < count($productsTxt); $i++)
    {
        $splitProduct = SplitString($productsTxt[$i], ",");

        $jsonData[$i] = [];
        $jsonData[$i]["name"] = $splitProduct[0];
        $jsonData[$i]["price"] = $splitProduct[1];
        $jsonData[$i]["image"] = $splitProduct[2];
    }

    echo json_encode($jsonData);

    function SplitString($str, $seperatorChar)
    {
        $strArray = [];
        $string = "";

        for ($i=0; $i < strlen($str); $i++)
        {
            if ($str[$i] == $seperatorChar)
            {
                $strArray[count($strArray)] = $string;
                $string = "";
            }
            else
            {
                $string .= $str[$i];
            }
        }

        $strArray[count($strArray)] = $string;

        return $strArray;
    }

?>