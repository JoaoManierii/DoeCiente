<?php
require "usuarioDAO.php";
class Usuario
{
    private $nome;
    private $email;
    private $senha;
    private $id;

    private $usuario;

    private $dao;

    public function __construct($conn)
    {
        $this->dao = new usuarioDAO($conn);
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getId()
    {
        return $this->id;
    }

    public static function insert($conn,$nome,$email,$senha){
        $sql = "INSERT INTO usuarios (nome, email, hashsenha) VALUES ('$nome', '$email', '$senha')";
        $dao = new usuarioDAO($conn);
        try{
            $dao->query($sql);   
            return true;
        } catch (mysqli_sql_exception $e) {
            $errorMessage = $e->getMessage();
            // Verifique se a mensagem de erro contém a indicação de e-mail duplicado
            if (strpos($errorMessage, "Duplicate entry") !== false && strpos($errorMessage, "for key 'email'") !== false) {
                return "Erro: E-mail já cadastrado.";
            }else if (strpos($errorMessage, "Duplicate entry") !== false && strpos($errorMessage, "for key 'usuario'") !== false) {
                return "Erro: Usuario já cadastrado.";
            } else {
                // Se for outro tipo de erro, apenas exiba a mensagem padrão
                return "Erro: " . $errorMessage;
            }
        }
    }

    public function update(){
        $sql = "INSERT INTO usuarios (nome, email, hashsenha) VALUES ('$this->nome', '$this->email', '$this->senha')";
        echo $this->dao->query($sql);
    }

    public function delete(){
        $sql = "INSERT INTO usuarios (nome, email, hashsenha) VALUES ('$this->nome', '$this->email', '$this->senha')";
        echo $this->dao->query($sql);
    }

    public function select($email,$senha_hash){
        $sql = "SELECT * FROM usuarios WHERE nome='$email' ";
        $result = $this->dao->select($sql);
        if($result!=false){
            if (password_verify($senha_hash, $result['hashsenha'])) {
                $this->nome = $result['nome'];    
                $this->email =$result['email'];
                $this->id=$result['hashsenha'];
                $this->senha = $result['id'];
                return true;
            } else {
                return "Senha incorreta." ;
            }
        }
    }



}
?>