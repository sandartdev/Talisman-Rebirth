<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Conexão com MySQL do Talisman Online
$host = 'localhost';  // IP do seu Ubuntu/servidor
$user = 'root';       // Usuário MySQL
$password = '';       // Senha MySQL
$database = 'talisman'; // Nome do banco (ajuste conforme seu banco)

try {
    $conexao = new mysqli($host, $user, $password, $database);
    
    if ($conexao->connect_error) {
        die(json_encode(['sucesso' => false, 'mensagem' => 'Erro ao conectar']));
    }
    
    $metodo = $_SERVER['REQUEST_METHOD'];
    
    if ($metodo === 'POST') {
        $dados = json_decode(file_get_contents('php://input'), true);
        $username = $conexao->real_escape_string($dados['username'] ?? '');
        $password = $conexao->real_escape_string($dados['password'] ?? '');
        
        // Buscar usuário na tabela de contas do Talisman
        // Ajuste o nome da tabela conforme seu banco
        $query = "SELECT * FROM accounts WHERE username = '$username' LIMIT 1";
        $resultado = $conexao->query($query);
        
        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            
            // Verificar senha (ajuste conforme o tipo de criptografia do seu banco)
            if (password_verify($password, $usuario['password'])) {
                $_SESSION['user_id'] = $usuario['id'];
                $_SESSION['username'] = $usuario['username'];
                
                echo json_encode([
                    'sucesso' => true,
                    'mensagem' => 'Login realizado com sucesso!',
                    'username' => $usuario['username']
                ]);
            } else {
                echo json_encode(['sucesso' => false, 'mensagem' => 'Senha incorreta']);
            }
        } else {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário não encontrado']);
        }
    }
    
    $conexao->close();
} catch (Exception $e) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: ' . $e->getMessage()]);
}
?>
