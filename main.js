// main.js

class Cliente {
  constructor(id, nombre, apellido, dni, email, password) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.password = password;
  }
}

class Cuenta {
  constructor(id, clienteId, saldo = 0) {
    this.id = id;
    this.clienteId = clienteId;
    this.saldo = parseFloat(saldo);
    this.movimientos = [];
  }

  agregarMovimiento(tipo, monto) {
    const fecha = new Date().toISOString();
    if (tipo === 'retiro' && monto > this.saldo) {
      alert("Saldo insuficiente");
      return;
    }
    this.movimientos.push({ tipo, monto, fecha });
    this.saldo += tipo === 'deposito' ? monto : -monto;
  }
}

const clientes = [];
const cuentas = [];

// Registrar cliente
const clienteForm = document.getElementById("cliente-form");
clienteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = Date.now().toString();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("dni").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  clientes.push(new Cliente(id, nombre, apellido, dni, email, password));
  alert("Cliente registrado con ID: " + id);
  clienteForm.reset();
});

// Crear cuenta
const cuentaForm = document.getElementById("cuenta-form");
cuentaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = Date.now().toString();
  const clienteId = document.getElementById("cliente-id").value;
  const saldo = parseFloat(document.getElementById("saldo").value);
  cuentas.push(new Cuenta(id, clienteId, saldo));
  alert("Cuenta creada con ID: " + id);
  cuentaForm.reset();
});

// Registrar movimiento
const movimientoForm = document.getElementById("movimiento-form");
movimientoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cuentaId = document.getElementById("cuenta-id").value;
  const tipo = document.getElementById("tipo").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const cuenta = cuentas.find(c => c.id === cuentaId);
  if (cuenta) {
    cuenta.agregarMovimiento(tipo, monto);
    alert("Movimiento registrado");
    movimientoForm.reset();
  } else {
    alert("Cuenta no encontrada");
  }
});

// Consultar saldo
const saldoForm = document.getElementById("saldo-form");
saldoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cuentaId = document.getElementById("cuenta-consulta").value;
  const cuenta = cuentas.find(c => c.id === cuentaId);
  const resultado = document.getElementById("saldo-result");
  if (cuenta) {
    resultado.textContent = `Saldo actual: $${cuenta.saldo.toFixed(2)}`;
  } else {
    resultado.textContent = "Cuenta no encontrada";
  }
});
