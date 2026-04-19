<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'talisman';

try {
    $conexao = new mysqli($host, $user, $password, $database);
    
    if ($conexao->connect_error) {
        die(json_encode(['sucesso' => false, 'mensagem' => 'Erro ao conectar']));
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $dados = json_decode(file_get_contents('php://input'), true);
        $username = $conexao->real_escape_string($dados['username'] ?? '');
        $password = $conexao->real_escape_string($dados['password'] ?? '');
        $email = $conexao->real_escape_string($dados['email'] ?? '');
        
        // Verificar se usuário já existe
        $query_check = "SELECT id FROM accounts WHERE username = '$username' LIMIT 1";
        $resultado_check = $conexao->query($query_check);
        
        if ($resultado_check->num_rows > 0) {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário já existe']);
            exit;
        }
        
        // Criptografar senha
        $hash_password = password_hash($password, PASSWORD_BCRYPT);
        
        // Inserir novo usuário
        $query_insert = "INSERT INTO accounts (username, password, email, created_at) VALUES ('$username', '$hash_password', '$email', NOW())";
        
        if ($conexao->query($query_insert)) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Conta criada com sucesso!']);
        } else {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao criar conta']);
        }
    }
    
    $conexao->close();
} catch (Exception $e) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: ' . $e->getMessage()]);
}
?>
