<?php
try {
    $db = new PDO('pgsql:host=localhost;dbname=data', 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

$method = $_SERVER["REQUEST_METHOD"];
if($method === "GET"){
    $q = "SELECT * From";
}
