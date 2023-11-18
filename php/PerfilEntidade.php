<?php 

class PerfilEntidade{

    private $ong;
    private $localizacao;
    private $telefone;
    private $fundacao;
    private $id;
    private $sobre;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id= $id;
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