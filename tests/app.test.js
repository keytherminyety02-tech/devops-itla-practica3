const request = require('supertest');
const { createApp } = require('../src/app');

describe('API de tareas', () => {
  let app;
  beforeEach(() => { app = createApp(); });

expect(r.status).toBe(500);

  test('POST /api/tareas crea una tarea', async () => {
    const r = await request(app).post('/api/tareas').send({ titulo: 'Configurar pipeline' });
    expect(r.status).toBe(201);
    expect(r.body).toMatchObject({ id: 1, titulo: 'Configurar pipeline', completada: false });
  });

  test('POST /api/tareas sin título devuelve 400', async () => {
    const r = await request(app).post('/api/tareas').send({});
    expect(r.status).toBe(400);
  });

  test('PATCH /api/tareas/:id alterna completada', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Escribir pruebas' });
    const r = await request(app).patch('/api/tareas/1');
    expect(r.body.completada).toBe(true);
  });

  test('PATCH de una tarea inexistente devuelve 404', async () => {
    const r = await request(app).patch('/api/tareas/99');
    expect(r.status).toBe(404);
  });

  test('GET /metrics cuenta solicitudes y tareas', async () => {
    await request(app).post('/api/tareas').send({ titulo: 'Medir' });
    const r = await request(app).get('/metrics');
    expect(r.body.tareas).toBe(1);
    expect(r.body.solicitudes).toBeGreaterThanOrEqual(2);
  });

  
  test('DELETE /api/tareas/:id elimina una tarea existente', async () => {
    const creada = await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Tarea para eliminar' });

    const r = await request(app)
      .delete(`/api/tareas/${creada.body.id}`);

    expect(r.status).toBe(200);
    expect(r.body.mensaje).toBe('Tarea eliminada correctamente');

    const lista = await request(app).get('/api/tareas');
    expect(lista.body).toHaveLength(0);
  });

  test('DELETE de una tarea inexistente devuelve 404', async () => {
    const r = await request(app).delete('/api/tareas/99');

    expect(r.status).toBe(404);
    expect(r.body.error).toBe('Tarea no encontrada');
  });

  test('DELETE mantiene las otras tareas', async () => {
    await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Primera tarea' });

    await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Segunda tarea' });

    await request(app).delete('/api/tareas/1');

    const r = await request(app).get('/api/tareas');

    expect(r.body).toHaveLength(1);
    expect(r.body[0].titulo).toBe('Segunda tarea');
  });

  test('POST mantiene IDs únicos después de eliminar', async () => {
    await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Primera' });

    await request(app).delete('/api/tareas/1');

    const r = await request(app)
      .post('/api/tareas')
      .send({ titulo: 'Nueva tarea' });

    expect(r.status).toBe(201);
    expect(r.body.id).toBe(2);
  });

});
