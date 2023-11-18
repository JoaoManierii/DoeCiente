<?php
class UsuarioEntidade {
    private $cpf;
    private $nome;

    public function getCpf() {
        return $this->cpf;
    }
    public function setCpf($cpf) {
        $this->cpf = $cpf;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome= $nome;
    }
}
?>