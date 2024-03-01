<script>
  let agenda = [];
  let newAgenda = '';

  function addAgenda() {
    if (newAgenda) {
      agenda = [...agenda, { text: newAgenda, important: false }];
      newAgenda = '';
    }
  }

  function toggleImportant(index) {
    const item = agenda[index];
    item.important = !item.important;

    agenda.splice(index, 1);

    let insertIndex = agenda.findIndex((a) => !a.important);
    if (insertIndex === -1) insertIndex = agenda.length;

    agenda.splice(insertIndex, 0, item);

    agenda = [...agenda];
  }

  function removeAgenda(index) {
    agenda.splice(index, 1);
    agenda = [...agenda];
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addAgenda();
    }
}
</script>
  <main>
  <h1>SvelteKit Agendas App</h1>
  <div class="add-agenda">
    <input class="agenda-input" bind:value={newAgenda} on:keypress={handleKeyPress} placeholder="Add a new agenda" />
    <button class="add-button" on:click={addAgenda}>Add</button>
  </div>
  <ul class="agenda-list">
    {#each agenda as item, index (item.text)}
      <li class="agenda-item">
        <span class={item.important ? 'important' : ''}>{item.text}</span>
        <div>
          <button class="important-button" on:click={() => toggleImportant(index)}>{item.important ? 'Unmark Important' : 'Mark Important'}</button>
          <button class="remove-button" on:click={() => removeAgenda(index)}>Remove</button>
        </div>
      </li>
    {/each}
  </ul>
</main>
  <style>
    main {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 20px;
    }
    h1 {
      color: #333;
    }
    .add-agenda {
      margin-bottom: 20px;
    }
    .agenda-input {
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .add-button {
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .agenda-list {
      list-style-type: none;
      padding: 0;
    }
    .agenda-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .remove-button {
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .important {
      font-weight: bold;
      color: #dc3545;
    }

    .important-button {
      background-color: #ffc107;
      color: #333;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 5px;
    }
</style>