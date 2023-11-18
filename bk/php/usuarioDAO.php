<?php
class usuarioDAO{
    private $conn;

    public function __construct($conn){
        $this->conn = $conn;
    }
    public function query($sql){
        
        if ($this->conn->query($sql) === TRUE) {
            echo true;
        } else {
            echo "Erro: " . $sql . "<br>" . $this->conn->error;
        }
    }

    public  function select($sql){
        $result = $this->conn->query($sql);
        if ($result->num_rows == 1) {
            // Usuário encontrado, verificar a senha
            return $result->fetch_assoc();
        }else 
            return false;

    }
}
?>