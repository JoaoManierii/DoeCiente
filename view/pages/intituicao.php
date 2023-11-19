<?php
require "/control/conexao.php";

$conn = new Conexao();

if (isset($_GET["id"])) {
    $id = htmlspecialchars($_GET["id"]);

    // Prepare a SQL statement
    $stmt = $conn->conexao->prepare("SELECT * FROM perfil WHERE id = ?");
    
    // Bind the parameter to the statement
    $stmt->bindParam(1, $id, PDO::PARAM_INT);
    
    // Execute the query
    $stmt->execute();
    
    // Get the result set
    $result = $stmt->fetch(PDO::FETCH_ASSOC);


    // Check if the query was successful
    if ($result) {
        // Check if a matching record was found
        if ($result->num_rows > 0) {
            // Fetch the record as an associative array
            $row = $result->fetch_assoc();

            // Access the record fields
            $name = $row['name'];
            $email = $row['email'];
            $endereco = $row['endereco'];
            $telefone = $row['telefone'];
            $sobre = $row['sobre'];
            $fundacao = $row['fundacao'];
            $ong = $row['ong'];
        } else {
            // No matching record found
            // Handle the case when no record is found
            // ...
            echo "<script>alert('Perfil não encontrado. Redirecionando para instituicoes.html.'); window.location.href='instituicoes.html';</script>";
            exit();
        }
    } else {
        // Query execution failed
        // Handle the case when the query fails
        // ...
        echo "<script>alert('Erro ao executar a consulta. Redirecionando para instituicoes.html.'); window.location.href='instituicoes.html';</script>";
        exit();
    }

    $conn->fecharConexao();
} else {
    // ID não informado
    $conn->fecharConexao();
    echo "<script>alert('ID não informado. Redirecionando para instituicoes.html.'); window.location.href='instituicoes.html';</script>";
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/view/styles/intituicao.css">
    <script src="/control/commum.js"></script>
    <script src="/control/header.js"></script>
    <script src="/control/footer.js"></script>
    <script src="/control/pixGenerator.js"></script>
    <title>Document</title>
</head>
<body>  
    <header></header>
    <main>
        <section>
            <div class="identificacao">
                <h1><?php echo $name; ?></h1>
                <p>Fundação: <?php echo $fundacao; ?></p>
                <p>ONG: <?php echo $ong; ?></p>
            </div>
            <div class="qrcode"></div>
        </section>
        <section class="Sobre">
            <h2>Sobre</h2>
            <p><?php echo $sobre; ?></p>
            <p>Endereço: <?php echo $endereco; ?></p>
            <p>Email: <?php echo $email; ?></p>
            <p>Telefone: <?php echo $telefone; ?></p>
        </section>
    </main>
    <footer></footer>
</body>
</html>

