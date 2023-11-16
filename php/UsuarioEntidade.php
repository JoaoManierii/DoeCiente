<?php
class UsuarioEntidade {
    private $nome;
    private $email;

    private $ong;

    private $localizacao;

    private $telefone;

    private $fundacao;

    private $sobre;


    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function getEmail() {
        return $this->email;
    }
    public function setEmail($email) {
        $this->email= $email;
    }

    public function getOng() {
        return $this->ong;
    }

    public function setOng($ong) {
        $this->ong = $ong;
    }

    public function getLocalizacao() {
        return $this->localizacao;
    }

    public function setLocalizacao($localizacao) {
        $this->localizacao = $localizacao;
    }

    public function getTelefone() {
        return $this->telefone;
    }

    public function setTelefone($telefone) {
        $this->telefone = $telefone;
    }

    public function getFundacao() {
        return $this->fundacao;
    }

    public function setFundacao($fundacao) {
        $this->fundacao = $fundacao;
    }

    public function getSobre() {
        return $this->sobre;
    }       

    public function setSobre($sobre) {
        $this->sobre = $sobre;
    }

}
?>