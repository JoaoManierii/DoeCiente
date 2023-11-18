<?php
require 'conexao.php';
require 'UsuarioEntidade.php';

try{
    session_start();
    if(isset($_POST["email"]) && isset($_POST["senha"])) {        
        $conn = new Conexao();

        $senha = htmlspecialchars($_POST["senha"]);
        $email = htmlspecialchars($_POST["email"]);

        $sql = "SELECT * FROM usuarios WHERE cpf = ?";
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
                $usuario->setEmail($row["email"]);
                $usuario->setNome($row["nome"]);           
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