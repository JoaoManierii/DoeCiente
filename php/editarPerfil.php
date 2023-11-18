<?php
require 'conexao.php';
require 'UsuarioEntidade.php';
require 'PerfilEntidade.php';

try{
    session_start();
    $usuario = $_SESSION['usuario'];

    //atualizar tabela usuario
    if(isset($_POST["email"]) && isset($_POST["nome"])){
        $nome = htmlspecialchars($_POST["nome"]);
        $email = htmlspecialchars($_POST["email"]);

    }
    

    //atualiza tabela instituição
    if(isset($_POST["ong"]) && isset($_POST["localizacao"]) && isset($_POST["telefone"]) && isset($_POST["fundacao"]) && isset($_POST["sobre"])) {        
        $conn = new Conexao();

        $ong = htmlspecialchars($_POST["ong"]);
        $localizacao = htmlspecialchars($_POST["localizacao"]);
        $telefone = htmlspecialchars($_POST["telefone"]);
        $fundacao = htmlspecialchars($_POST["fundacao"]);
        $sobre = htmlspecialchars($_POST["sobre"]);


        $sql = "INSERT INTO perfil (ong, localizacao, telefone, fundacao, sobre)
        VALUES ('$ong', '$localizacao', '$telefone', '$fundacao', '$sobre') WHERE id = '$usuario->getId()'";

        $stmt = $conn->conexao->prepare( $sql );

        $stmt->bindParam(1, $ong);
        $stmt->bindParam(2, $localizacao);
        $stmt->bindParam(3, $telefone);
        $stmt->bindParam(4, $fundacao);
        $stmt->bindParam(5, $sobre);
        $resultado = $stmt->execute();

        if($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = ['message' => 'Atualizado com sucesso',
                        'result' => true];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        else {
            $response = ['message' => 'Erro ao atualizar',
                            'result' => false];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        
    }else{
        $response = ['message' => 'Verifique os campos e tente novamente',
                'result' => false];
        echo json_encode($response);    
    }
}catch(PDOException $e){
    $response = ['message' => $e->getMessage(), 'result' => false];
    // header('Content-Type: application/json');
    echo json_encode($response);
}

?>