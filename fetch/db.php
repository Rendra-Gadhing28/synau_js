<?php
$db = new mysqli('localhost','root', '', 'nyoba');
if($db->connect_errno){
    die("Gagal gok");
}
$method = $_SERVER["REQUEST_METHOD"];
if($method === "GET"){
    $q = "SELECT * From user";
}
?>
