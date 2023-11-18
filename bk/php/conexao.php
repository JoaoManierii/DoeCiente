<?php
class Conexao {
    public $conexao;

    function __construct() {
        if (!isset($this->conexao)) {
            try {
                $this->conexao = new PDO('mysql:host=sql208.infinityfree.com;dbname=if0_35265683_banco', 'if0_35265683', '2PeCg9NOH1E9');
            } catch (PDOException $e) {
                echo 'Error: ' . $e->getMessage();
            }
        }
    }

    function fecharConexao(){
        if (isset($this->conexao)) {
            $this->conexao = null;
        }
    }
}
?>
