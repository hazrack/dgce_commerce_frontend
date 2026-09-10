<template>
  <div class="component-custom-table">
    <b-table
      bordered
      hover
      :items="tableData"
      :fields="fields"
      class="simple-table"
    >
     
      <template #cell(labelProduct)="data">
        {{ data.value.length > 50 ? data.value.substring(0, 50) + "..." : data.value}}
      </template>
      <template #cell(exportAmount)="data">
        {{ convertToMilliard(data.value) }}
      </template>
      <template #cell(importAmount)="data">
        {{ convertToMilliard(data.value) }}
      </template>
      <template #cell(montant)="data">
        {{ addSeparatorNumber(data.value) }}
      </template>
      <template #cell(poids)="data">
        {{ addSeparatorNumber(data.value) }}
      </template>
      <template #cell(totalAmount)="data">
        {{ convertTotalAmountToMilliard ? convertToMilliard(data.value) : addSeparatorNumber(data.value) }}
      </template>
      <template #cell(exportWeight)="data">
        {{ convertKgToTonne(data.value) }}
      </template>
      <template #cell(importWeight)="data">
        {{ convertKgToTonne(data.value) }}
      </template>
      <template #cell(totalWeight)="data">
        {{ convertKgToTonne(data.value) }}
      </template>

      

      <template #cell(balance)="data">
        <div :class="{'deficit': isDeficit(data.item), 'excedent': !isDeficit(data.item)}">
          <p class="balance-text"> {{ calculateBalance(data.item) }} </p>
        </div>  
      </template>

      <template #cell(role)="data">
        {{ data.item.roles }}
      </template>

      
      <template #cell(documentUrl)="data">
        <div class="action-btn" v-if="data.item.documentUrl !== null">
            <button class="btn-action edit" @click="$emit('downloadCoopec', data.item.documentUrl)">
            <i class="bi bi-arrow-down"></i>
          </button>
        </div>
        <div class="action-btn" v-else>
            <i class="bi bi-x-circle"></i>
        </div>
      </template>

      <template #cell(part)="data">
        <span v-if="data.item.part === 100">//</span>
        <span v-else>{{ addSeparatorNumber(data.value) }}</span>
      </template>

      <template #cell(action)="data">
        <div class="action-btn" v-if="loginUserRole == 'admin'">
          <button class="btn-action edit" @click="$emit('edit', data.item)">
            <img src="../../assets/icons/edition.png" alt="Éditer" />
          </button>
          <button class="btn-action delete" @click="$emit('delete', data.item)">
            <img src="../../assets/icons/trash-icon.png" alt="Supprimer" />
          </button>
        </div>
      </template>


    </b-table>


  </div>
</template>
  
  <script>
export default {
  name: "TableComponent",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    
    loginUserRole: {
      type: String,
      required: false,
    },

    convertTotalAmountToMilliard: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  methods:{
    addSeparatorNumber(value) {
      if (value === 0) return '0';
      if (!value) return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },

    convertKgToTonne(valueKg) {
      if (valueKg === 0) return '0';
      if (!valueKg) return '';
      return (valueKg / 1000).toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    convertToMilliard(value) {
      if (value === 0) return '0';
      if (!value) return '';
      return (value / 1e9).toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    calculateBalance(item) {
    const formatted = this.convertToMilliard(Math.abs(item.balance));

    if (item.balance > 0) {
      return `Excédentaire (+${formatted})`;
    } else if (item.balance < 0) {
      return `Déficitaire (-${formatted})`;
    } else {
      return 'Équilibre';
    }
  },
  
  isDeficit(item) {
    return item.balance < 0;
  }

  }
 
  
};
</script>
  

<style lang="scss" scoped>

.action-btn {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  .btn-action {
    background-color: #f5f7fa;
    border: none;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
    }

    &:hover {
      transform: scale(1.1);
    }

    &.edit {
      background-color: #e0f7fa;

      &:hover {
        background-color: #b2ebf2;
      }
    }

    &.delete {
      background-color: #ffebee;

      &:hover {
        background-color: #ffcdd2;
      }
    }
  }
}


.deficit {
  background: #e53e3e; /* Rouge pour déficit */
}
.deficit,.excedent{
  font-weight: 600;
  text-align: center;
  color: #fff;
  padding: 6px 0;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #000;
}
.excedent {
  background: #38a169; /* Vert pour excédent */
}

.balance-text {
    font-size: 12px !important;
    padding: 2px 4px;
}

</style>