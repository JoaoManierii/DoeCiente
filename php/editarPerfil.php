<?php
require 'conexao.php';
require 'UsuarioEntidade.php';

try{
    session_start();
    if(isset($_POST["email"]) && isset($_POST["senha"]) && isset($_POST["nome"]) && isset($_POST["ong"]) && isset($_POST["localizacao"]) && isset($_POST["telefone"]) && isset($_POST["fundacao"]) && isset($_POST["sobre"])) {        
        $conn = new Conexao();

        $nome = htmlspecialchars($_POST["nome"]);
        $ong = htmlspecialchars($_POST["ong"]);
        $localizacao = htmlspecialchars($_POST["localizacao"]);
        $email = htmlspecialchars($_POST["email"]);
        $telefone = htmlspecialchars($_POST["telefone"]);
        $fundacao = htmlspecialchars($_POST["fundacao"]);
        $sobre = htmlspecialchars($_POST["sobre"]);

        $sql = "INSERT INTO perfil (nome, ong, localizacao, email, telefone, fundacao, sobre)
        VALUES ('$nome', '$ong', '$localizacao', '$email', '$telefone', '$fundacao', '$sobre')
        ON DUPLICATE KEY UPDATE nome='$nome', ong='$ong', localizacao='$localizacao', email='$email', telefone='$telefone', fundacao='$fundacao', sobre='$sobre'";

        $stmt = $conn->conexao->prepare( $sql );

        $stmt->bindParam(1, $email);
        $resultado = $stmt->execute();

        if($stmt->rowCount() == 1) {
            
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if(!password_verify($senha, $row["senha"])) {
                $response = ['message' => 'Usuario e/ou Senha Incorretos',
                            'result' => false];
            }else{
                $usuario = new UsuarioEntidade();
                $usuario->setNome($row["nome"]);  
                $usuario->setOng($row["ong"]);      
                $usuario->setLocalizacao($row["localizacao"]);     
                $usuario->setEmail($row["email"]);
                $usuario->setTelefone($row["telefone"]);
                $usuario->setFundacao($row["fundacao"]);
                $usuario->setSobre($row["sobre"]);
                $_SESSION["login"] = "1";
                $_SESSION["usuario"] = $usuario;
                $response = ['message' => 'Login realizado com sucesso',
                            'result' => true];
            }
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        else {
            $response = ['message' => 'Usuario e/ou Senha Incorretos',
                            'result' => false];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        
    }
}catch(PDOException $e){
    $response = ['message' => $e->getMessage(), 'result' => false];
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>